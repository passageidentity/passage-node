import { AuthStrategy } from '../types/AuthStrategy';
import { MagicLinkObject, MagicLinkRequest } from '../types/MagicLink';
import { AppObject } from '../types/App';
import User from './User';
import { decodeProtectedHeader, jwtVerify, createRemoteJWKSet } from 'jose';
import { Request } from 'express-serve-static-core';
import axios from '../utils/axios';
import { PassageConfig } from '../types/PassageConfig';
import { PassageError } from './PassageError';

/**
 * Passage Class
 */
export default class Passage {
    appID: string;
    #apiKey: string | undefined;
    authStrategy: AuthStrategy;
    user: User;

    /**
     * Initialize a new Passage instance.
     * @param {PassageConfig} config The default config for Passage initialization
     */
    constructor(config?: PassageConfig) {
        if (!config?.appID) {
            throw new PassageError('A Passage appID is required. Please include {appID: YOUR_APP_ID}.');
        }
        this.appID = config.appID;
        this.#apiKey = config?.apiKey;
        this.user = new User(config);

        this.authStrategy = config?.authStrategy ? config.authStrategy : 'COOKIE';
    }

    /**
     * Authenticate request with a cookie, or header. If no authentication
     * strategy is given, authenticate the request via cookie (default
     * authentication strategy).
     *
     * @param {Request} req Express request
     * @return {string} UserID of the Passage user
     */
    async authenticateRequest(req: Request): Promise<string> {
        if (this.authStrategy == 'HEADER') {
            return this.authenticateRequestWithHeader(req);
        } else {
            return this.authenticateRequestWithCookie(req);
        }
    }

    /**
     * Set API key for this Passage instance
     * @param {string} _apiKey
     */
    set apiKey(_apiKey) {
        this.#apiKey = _apiKey;
    }

    /**
     * Get API key for this Passage instance
     * @return {string | undefined} Passage API Key
     */
    get apiKey(): string | undefined {
        return this.#apiKey;
    }

    /**
     * Authenticate a request via the http header.
     *
     * @param {Request} req Express request
     * @return {string} User ID for Passage User
     */
    async authenticateRequestWithHeader(req: Request): Promise<string> {
        const { authorization } = req.headers;

        if (!authorization) {
            throw new PassageError('Header authorization not found. You must catch this error.');
        } else {
            const authToken = authorization.split(' ')[1];
            const userID = await this.validAuthToken(authToken);
            if (userID) {
                return userID;
            } else {
                throw new Error('Auth token is invalid');
            }
        }
    }

    /**
     * Authenticate request via cookie.
     *
     * @param {Request} req Express request
     * @return {string} UserID for Passage User
     */
    async authenticateRequestWithCookie(req: Request): Promise<string> {
        const cookiesStr = req.headers?.cookie;
        if (!cookiesStr) {
            throw new PassageError('Could not find valid cookie for authentication. You must catch this error.');
        }

        const cookies = cookiesStr.split(';');
        let passageAuthToken;
        for (const cookie of cookies) {
            const sepIdx = cookie.indexOf('=');
            if (sepIdx === -1) {
                continue;
            }
            const key = cookie.slice(0, sepIdx).trim();
            if (key !== 'psg_auth_token') {
                continue;
            }
            passageAuthToken = cookie.slice(sepIdx + 1).trim();
            break;
        }

        if (passageAuthToken) {
            const userID = await this.validAuthToken(passageAuthToken);
            if (userID) return userID;
            else {
                throw new PassageError('Could not validate auth token. You must catch this error.');
            }
        } else {
            throw new PassageError(
                "Could not find authentication cookie 'psg_auth_token' token. You must catch this error.",
            );
        }
    }

    /**
     * Determine if the provided token is valid when compared with its
     * respective public key.
     *
     * @param {string} token Authentication token
     * @return {string} sub claim if the jwt can be verified, or undefined
     */
    async validAuthToken(token: string): Promise<string | undefined> {
        try {
            const { kid } = decodeProtectedHeader(token);
            if (!kid) {
                return undefined;
            }

            const JWKS = createRemoteJWKSet(
                new URL(`https://auth.passage.id/v1/apps/${this.appID}/.well-known/jwks.json`),
                {
                    cacheMaxAge: 1000 * 60 * 60 * 24, // 24 hours
                },
            );

            const {
                payload: { sub: userID },
            } = await jwtVerify(token, JWKS);
            if (userID) return userID.toString();
            else return undefined;
        } catch (e) {
            return undefined;
        }
    }

    /**
     * Create a Magic Link for your app.
     *
     * @param {MagicLinkRequest} magicLinkReq options for creating a MagicLink.
     * @return {Promise<MagicLinkObject>} Passage MagicLink object
     */
    async createMagicLink(magicLinkReq: MagicLinkRequest): Promise<MagicLinkObject> {
        const magicLinkData: MagicLinkObject = await axios
            .post(`https://api.passage.id/v1/apps/${this.appID}/magic-links/`, magicLinkReq, {
                headers: {
                    Authorization: `Bearer ${this.#apiKey}`,
                },
            })
            .catch((err) => {
                throw new PassageError('Could not create a magic link for this app.', err);
            })
            .then((res) => {
                return res.data.magic_link;
            });
        return magicLinkData;
    }

    /**
     * Get App Info about an app
     *
     * @return {Promise<AppObject>} Passage App object
     */
    async getApp(): Promise<AppObject> {
        const appData: AppObject = await axios
            .get(`https://api.passage.id/v1/apps/${this.appID}`)
            .catch((err) => {
                throw new PassageError('Could not fetch app.', err);
            })
            .then((res) => {
                return res.data.app;
            });

        return appData;
    }
}
