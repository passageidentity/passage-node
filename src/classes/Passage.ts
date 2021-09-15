import { AuthStrategy } from "../types/AuthStrategy";
import User from "./User";
import jwt from "jsonwebtoken";
import { Request, NextFunction, Response } from "express-serve-static-core";
import base64 from "base-64";
import axios from "axios";
import { PassageConfig } from "../types/PassageConfig";


export default class Passage {
    appID: string;
    #publicKey: string;
    #apiKey: string | undefined;
    authStrategy: AuthStrategy;
    user: User;

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

        this.#publicKey = '';
        this.authStrategy = config?.authStrategy ? config.authStrategy : "DEFAULT";
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
    async authenticateRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        switch (this.authStrategy) {
            case "COOKIE":
                return this.authenticateRequestWithCookie(req, res, next);
            case "HEADER":
                return this.authenticateRequestWithHeader(req, res, next);
            default:
                return this.authenticateRequestWithCookie(req, res, next);
        }
    }

    set apiKey(_apiKey) {
        this.#apiKey = _apiKey;
    }

    get apiKey(): string | undefined {
        return this.#apiKey;
    }

    set publicKey(_publicKey) {
        this.#publicKey = _publicKey;
    }
    
    get publicKey(): string {
        return this.#publicKey;
    }

    /**
     * Fetch the corresponding public key for this Passage instance.
     * 
     * @returns {Promise<string>} publicKey
     */
    async fetchPublicKey(): Promise<string> {
        // use cached value if found
        if (this.#publicKey) return this.#publicKey;
    
        let publicKey: string = await axios.get(`https://api.passage.id/v1/apps/${this.appID}`)
            .catch(err => {
                throw new Error(`Could not fetch appID\'s respective public key. HTTP status: ${err.response.status}`);
            })
            .then(res => {
                let rsaPublicKey = res.data.app.rsa_public_key;
                let finalPublicKey = base64.decode(rsaPublicKey);

                this.publicKey = finalPublicKey;
    
                return finalPublicKey;
            });
    
        return publicKey;
    }

    /**
     * Authenticate a request via the http header.
     * 
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @returns Middleware function for use in header authentication
     */
    async authenticateRequestWithHeader(req: any, res: Response, next: NextFunction): Promise<void> {
        try {
            let publicKey = await this.fetchPublicKey();
            let { authorization } = req.headers;

            if (authorization) {
                req.token = authorization.split(" ")[1];
                let validRequest = this.validAuthToken(req.token, publicKey);
                
                if (validRequest) {
                    res.passage = this;
                    next();
                }
                else throw new Error("Request could not be authenticated");
            } else throw new Error("Header authorization not found");
        } catch (e) {
            console.warn(e);
            res.send("Could not authenticate request with header.");
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
    async authenticateRequestWithCookie(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.headers.cookie) throw new Error("Could not fetch cookies");
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
                if(this.validAuthToken(psg_auth_token, publicKey)) {
                    res.passage = this;
                    next();
                }
                else throw new Error("Could not validate auth token.");
            }
            else throw new Error("Could not find authentication cookie 'psg_auth_token' token");
        } catch(e) {
            console.warn(e);
            res.send("Could not authenticate user with cookie.");
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
    validAuthToken(token: string, publicKey: string): boolean {
        try {
            let validAuthToken = jwt.verify(token, publicKey);
            if (validAuthToken) return true;
            else return false;
        } catch(e) {
            return false
        }
    }
 }
 