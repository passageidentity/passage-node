import { AuthStrategy } from '../types/AuthStrategy';
import { PassageConfig } from '../types/PassageConfig';
import { PassageError } from './PassageError';
import User from './User';
import {
    AppInfo,
    AppsApi,
    Configuration,
    CreateMagicLinkRequest,
    MagicLink,
    MagicLinksApi,
    ResponseError,
} from '../generated';
import apiConfiguration from '../utils/apiConfiguration';
import { IncomingMessage } from 'http';
import { getHeaderFromRequest } from '../utils/getHeader';
import { PassageInstanceConfig } from './PassageBase';
import { Auth } from './Auth';

/**
 * Passage Class
 */
export class Passage {
    private appID: string;
    #apiKey: string | undefined;
    private authStrategy: AuthStrategy;
    public user: User;
    public auth: Auth;

    private _apiConfiguration: Configuration;

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

        this.authStrategy = config?.authStrategy ? config.authStrategy : 'COOKIE';

        this._apiConfiguration = apiConfiguration({
            accessToken: this.#apiKey,
            fetchApi: config.fetchApi,
        });

        const instanceConfig: PassageInstanceConfig = {
            appId: config.appID,
            apiConfiguration: this._apiConfiguration,
        }

        this.user = new User(config);
        this.auth = new Auth(instanceConfig);
    }

    /**
     * Authenticate request with a cookie, or header. If no authentication
     * strategy is given, authenticate the request via cookie (default
     * authentication strategy).
     *
     * @param {IncomingMessage | Request} req Node http request or fetch request
     * @return {string} UserID of the Passage user
     */
    async authenticateRequest(req: IncomingMessage | Request): Promise<string> {
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
     * @param {IncomingMessage | Request} req Node http request or fetch request
     * @return {string} User ID for Passage User
     */
    async authenticateRequestWithHeader(req: IncomingMessage | Request): Promise<string> {
        const authorization = getHeaderFromRequest(req, 'authorization');

        if (!authorization || typeof authorization !== 'string') {
            throw new PassageError('Header authorization not found. You must catch this error.');
        } else {
            const authToken = (authorization as string).split(' ')[1];
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
     * @param {IncomingMessage | Request} req Node http request or fetch request
     * @return {string} UserID for Passage User
     */
    async authenticateRequestWithCookie(req: IncomingMessage | Request): Promise<string> {
        const cookiesStr = getHeaderFromRequest(req, 'cookie');
        if (!cookiesStr || typeof cookiesStr !== 'string') {
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
     * @return {string} sub claim if the jwt can be verified, or Error
     */
    async validAuthToken(token: string): Promise<string | undefined> {
        return this.auth.validateJwt(token);
    }

    /**
     * Create a Magic Link for your app.
     *
     * @param {MagicLinkRequest} magicLinkReq options for creating a MagicLink.
     * @return {Promise<MagicLink>} Passage MagicLink object
     */
    async createMagicLink(magicLinkReq: CreateMagicLinkRequest): Promise<MagicLink> {
        try {
            const client = new MagicLinksApi(this._apiConfiguration);
            const response = await client.createMagicLink({
                appId: this.appID,
                createMagicLinkRequest: magicLinkReq,
            });

            return response.magic_link;
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError(err, 'Could not create a magic link for this app');
            }

            throw err;
        }
    }

    /**
     * Get App Info about an app
     *
     * @return {Promise<AppInfo>} Passage App object
     */
    async getApp(): Promise<AppInfo> {
        try {
            const client = new AppsApi(this._apiConfiguration);
            const response = await client.getApp({
                appId: this.appID,
            });

            return response.app;
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError(err, 'Could not fetch app');
            }

            throw err;
        }
    }
}
