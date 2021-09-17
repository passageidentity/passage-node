import { AuthStrategy } from "../types/AuthStrategy";
import User from "./User";
import jwt from "jsonwebtoken";
import { Request, NextFunction, Response } from "express-serve-static-core";
import base64 from "base-64";
import axios from "axios";
import { PassageConfig } from "../types/PassageConfig";
import { passagePublicKeyCache } from "..";

export default class Passage {
    appID: string;
    #apiKey: string | undefined;
    authStrategy: AuthStrategy;
    user: User;
    #config: PassageConfig;

    /**
     * Initialize a new Passage instance.
     * 
     * @param {PassageConfig} config The default config for Passage initialization
     */
    constructor(config?: PassageConfig) {
        if (!config?.appID) {
            throw new Error("A Passage appID is required. Please include {appID: YOUR_APP_ID}.");
        }
        this.appID = config.appID;
        this.#apiKey = config?.apiKey;
        this.user = new User(config);

        this.authStrategy = config?.authStrategy ? config.authStrategy : "DEFAULT";
        this.#config = config;
    }

    /**
     * Authenticate request with a cookie, or header. If no authentication
     * strategy is given, authenticate the request via cookie (default
     * authentication strategy).
     * 
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @returns Middleware function for use in authentication
     */
    async authenticateRequest(req: Request, res: Response, next?: NextFunction): Promise<void|boolean|User> {
        switch (this.authStrategy) {
            case "COOKIE":
                if (next) return this.authenticateRequestWithCookie(req, res, next);
                else return this.authenticateRequestWithCookie(req, res);
            case "HEADER":
                if (next) return this.authenticateRequestWithHeader(req, res, next);
                else return this.authenticateRequestWithHeader(req, res);
            default:
                if (next) return this.authenticateRequestWithCookie(req, res, next);
                else return this.authenticateRequestWithCookie(req, res);
        }
    }

    set apiKey(_apiKey) {
        this.#apiKey = _apiKey;
    }

    get apiKey(): string | undefined {
        return this.#apiKey;
    }

    /**
     * Fetch the corresponding public key for this Passage instance.
     * 
     * @returns {Promise<string>} publicKey
     */
    async fetchPublicKey(): Promise<string> {
        // use cached value if found
        let cachedPublicKey = passagePublicKeyCache[this.appID];
        if (cachedPublicKey) return cachedPublicKey;
    
        let publicKey: string = await axios.get(`https://api.passage.id/v1/apps/${this.appID}`)
            .catch(err => {
                throw new Error(`Could not fetch appID\'s respective public key. HTTP status: ${err.response.status}`);
            })
            .then(res => {
                let rsaPublicKey = res.data.app.rsa_public_key;
                let finalPublicKey = base64.decode(rsaPublicKey);
                passagePublicKeyCache[this.appID] = finalPublicKey;

                return finalPublicKey;
            });
    
        return publicKey;
    }

    get express() {
        let passage = new Passage(this.#config);
        return (req: Request, res: Response, next: NextFunction) => {
            passage.authenticateRequest(req, res, next);
        }
    }

    /**
     * Authenticate a request via the http header.
     * 
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @returns Middleware function for use in header authentication
     */
    async authenticateRequestWithHeader(req: any, res: Response, next?: NextFunction): Promise<void|boolean|User> {
            let publicKey = await this.fetchPublicKey();
            let { authorization } = req.headers;

            if (authorization) {
                req.token = authorization.split(" ")[1];
                let userID = this.validAuthToken(req.token, publicKey, next);
                
                if (userID) {
                    if (next) next();
                    else return userID;
                } else {
                    if (next) res.status(401).send('unauthorized');
                    else throw new Error("Could not validate header auth token. You must catch this error.");
                }
            } else {
                if (next) res.status(401).send('unauthorized');
                else throw new Error("Header authorization not found. You must catch this error.");
            }
    }
    
    /**
     * Authenticate request via cookie.
     * 
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @returns Middleware function for use in cookie authentication
     */
    async authenticateRequestWithCookie(req: Request, res: Response, next?: NextFunction): Promise<boolean|void|User> {
        if (!req.headers.cookie) throw new Error("Could not fetch cookies. You must catch this error.");
        let cookies: any = {};
        req.headers && req.headers.cookie.split(';').forEach((cookie: any) => {
            let parts = cookie.match(/(.*?)=(.*)$/);
            if (parts) {
                let key = parts[1].trim();
                let value = parts[2].trim() || '';
                cookies[key] = value;
            }
        });
        
        let psg_auth_token = cookies.psg_auth_token;
        if (psg_auth_token) {
            let publicKey = await this.fetchPublicKey();
            let userID = this.validAuthToken(psg_auth_token, publicKey, next);
            if (userID) {
                if (next) next();
                else return userID;
            } else {
                if (next) res.status(401).send('unauthorized');
                else throw new Error("Could not validate cookie auth token. You must catch this error.");
            }
        } else {
            if (next) res.status(401).send('unauthorized'); 
            else throw new Error("Could not find authentication cookie 'psg_auth_token' token. You must catch this error.");
        }
    }

    /**
     * Determine if the provided token is valid when compared with its
     * respective public key.
     * 
     * @param token Authentication token
     * @param publicKey The public key corresponding to the Passage application
     * @returns {boolean} True if the jwt can be verified, false jwt cannot be verified
     */
     validAuthToken(token: string, publicKey: string, next?: NextFunction): boolean {
        try {
            let validAuthToken = jwt.verify(token, publicKey);
            if (validAuthToken) {
                let userID: any = validAuthToken.sub;
                if (next) this.user.id = userID;
                return userID;
            } else return false;
        } catch(e) {
            console.log(e);
            return false
        }
    }
 }
 