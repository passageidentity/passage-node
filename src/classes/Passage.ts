import { AuthStrategy } from "../types/AuthStrategy";
import { MagicLinkObject, MagicLinkRequest } from "../types/MagicLink";
import User from "./User";
import jwt from "jsonwebtoken";
import { Request } from "express-serve-static-core";
import base64 from "base-64";
import axios from "axios";
import { PassageConfig } from "../types/PassageConfig";
import { passagePublicKeyCache } from "..";

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
            throw new Error(
                "A Passage appID is required. Please include {appID: YOUR_APP_ID}."
            );
        }
        this.appID = config.appID;
        this.#apiKey = config?.apiKey;
        this.user = new User(config);

        this.authStrategy = config?.authStrategy ? config.authStrategy : "COOKIE";
    }

    /**
   * Authenticate request with a cookie, or header. If no authentication
   * strategy is given, authenticate the request via cookie (default
   * authentication strategy).
   *
   * @param {Request} req Express request
   * @return {string} UserID of the Passage user
   */
    async authenticateRequest(req: Request): Promise<string | false> {
        if (this.authStrategy == "HEADER") {
            return this.authenticateRequestWithHeader(req);
        } else {
            // defaults to cookie
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
   * Fetch the corresponding public key for this Passage instance.
   *
   * @return {Promise<string>} publicKey
   */
    async fetchPublicKey(): Promise<string> {
    // use cached value if found
    // @ts-ignore
        const cachedPublicKey = passagePublicKeyCache[this.appID];
        if (cachedPublicKey) return cachedPublicKey;

        const publicKey: string = await axios
            .get(`https://api.passage.id/v1/apps/${this.appID}`)
            .catch((err) => {
                throw new Error(
                    `Could not fetch appID\'s respective public key. HTTP status: ${err.response.status}`
                );
            })
            .then((res) => {
                const rsaPublicKey = res.data.app.rsa_public_key;
                const finalPublicKey = base64.decode(rsaPublicKey);
                // @ts-ignore
                passagePublicKeyCache[this.appID] = finalPublicKey;

                return finalPublicKey;
            });

        return publicKey;
    }

    /**
   * Authenticate a request via the http header.
   *
   * @param {Request} req Express request
   * @return {string} User ID for Passage User
   */
    async authenticateRequestWithHeader(req: Request): Promise<string | false> {
        const publicKey = await this.fetchPublicKey();
        const { authorization } = req.headers;

        if (authorization) {
            // @ts-ignore
            req.token = authorization.split(" ")[1];
            // @ts-ignore
            const userID = this.validAuthToken(req.token, publicKey);

            if (userID) return userID;
            else {
                throw new Error(
                    "Could not validate header auth token. You must catch this error."
                );
            }
        } else {
            throw new Error(
                "Header authorization not found. You must catch this error."
            );
        }
    }

    /**
   * Authenticate request via cookie.
   *
   * @param {Request} req Express request
   * @return {string} UserID for Passage User
   */
    async authenticateRequestWithCookie(req: Request): Promise<string | false> {
        if (!req.headers.cookie) {
            throw new Error(
                "Could not find valid cookie for authentication. You must catch this error."
            );
        }

        const cookies = {};

        req.headers.cookie?.split(";").forEach((cookie) => {
            const parts = cookie.match(/(.*?)=(.*)$/);
            if (parts) {
                const key = parts[1].trim();
                const value = parts[2].trim() || "";
                // @ts-ignore
                cookies[key] = value;
            }
        });

        // @ts-ignore
        const passageAuthToken = cookies.psg_auth_token;
        if (passageAuthToken) {
            const publicKey = await this.fetchPublicKey();
            const userID = this.validAuthToken(passageAuthToken, publicKey);
            if (userID) return userID;
            else {
                throw new Error(
                    "Could not validate auth token. You must catch this error."
                );
            }
        } else {
            throw new Error(
                "Could not find authentication cookie 'psg_auth_token' token. You must catch this error."
            );
        }
    }

    /**
   * Determine if the provided token is valid when compared with its
   * respective public key.
   *
   * @param {string} token Authentication token
   * @param {string} publicKey The public key corresponding to the Passage application
   * @return {boolean} True if the jwt can be verified, false jwt cannot be verified
   */
    validAuthToken(token: string, publicKey: string): string | false {
        try {
            const validAuthToken = jwt.verify(token, publicKey).sub;
            if (validAuthToken) return validAuthToken.toString();
            else return false;
        } catch (e) {
            return false;
        }
    }

    /**
   * Create a Magic Link for your app.
   *
   * @param {MagicLinkRequest} magicLinkReq options for creating a MagicLink.
   * @return {Promise<MagicLinkObject>} Passage MagicLink object
   */
    async createMagicLink(
        magicLinkReq: MagicLinkRequest
    ): Promise<MagicLinkObject> {
        const magicLinkData: MagicLinkObject = await axios
            .post(
                `https://api.passage.id/v1/apps/${this.appID}/magic-links/`,
                magicLinkReq,
                {
                    headers: {
                        Authorization: `Bearer ${this.#apiKey}`,
                    },
                }
            )
            .catch((err) => {
                throw new Error(
                    `Could not create a magic link for this app. HTTP Status: ${err.response.status}.`
                );
            })
            .then((res) => {
                return res.data.magic_link;
            });
        return magicLinkData;
    }
}
