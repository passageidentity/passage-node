import { Request, NextFunction, Response } from "express-serve-static-core";

import jwt from "jsonwebtoken";
import axios from "axios";
import base64 from "base-64";

import { AuthStrategy } from "./types/AuthStrategy";
import { PassageConfig } from "./types/PassageConfig";

declare global{
    namespace Express {
        export interface Response {
            passage: Passage
        }
    }
}


export default function initialize(config: PassageConfig) {
    if (!config.appID) throw new Error("Passage requires an App ID");
    
    let passage = new Passage(config);
    return (req: Request, res: Response, next: NextFunction) => {
        passage.authenticateRequest(req, res, next);
    }
}

export class Passage {
    appID: string;
    #publicKey: string;
    #apiKey: string;
    authStrategy: AuthStrategy;
    authorizationHeader: object | undefined;

    constructor(config?: any) {
        console.log(config);
        this.appID = config.appID;
        this.#apiKey = config.apiKey ? config.apiKey : '';

        if (this.#apiKey) {
            this.authorizationHeader = { headers: {
                'Authorization': `Bearer ${this.#apiKey}` 
            }}
        } else {
            this.authorizationHeader = undefined;
        }

        this.#publicKey = '';
        this.authStrategy = config?.authStrategy ? config.authStrategy : "DEFAULT";
    }

    async authenticateRequest(req: Request, res: Response, next: NextFunction) {
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

    get apiKey(): string {
        return this.#apiKey;
    }

    set publicKey(_publicKey) {
        this.#publicKey = _publicKey;
    }
    
    get publicKey(): string {
        return this.#publicKey;
    }

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

    async authenticateRequestWithHeader(req: any, res: Response, next: NextFunction) {
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
    
    async authenticateRequestWithCookie(req: Request, res: Response, next: NextFunction) {
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

    async getUser(userID: string): Promise<object> {
        // add api key to axios request
        if (!this.#apiKey) throw new Error("A Passage API key is needed to make a getUser request");

        let userData: object = await axios.get(
            `https://api.passage.id/v1/apps/${this.appID}/users/${userID}`,
            {
                headers: {
                    'Authorization': `Bearer ${this.#apiKey}`,
                }
            }
        )
            .catch(err => {
                throw new Error(`Could not fetch user. HTTP status: ${err.response.status}`);
            })
            .then(res => {
                return res.data.user;
            });

        return userData;
    }

    async activateUser(userID: string): Promise<object> {
        try {
            if (!this.#apiKey) throw new Error("A Passage API key is needed to make an activateUser request");

            let userData: object = await axios.patch(
                `https://api.passage.id/v1/apps/${this.appID}/users/${userID}/activate`,
                null, // note that this null is required as axios.post has different param order than axios.get
                {
                    headers: {
                        'Authorization': `Bearer ${this.#apiKey}`,
                    }
                }
            )
                .catch(err => {
                    throw new Error(`Could not activate user. HTTP status: ${err.response.status}`);
                })
                .then(res => {
                    return res.data.user;
                });
    
            return userData;
        } catch(e) {
            console.warn(e);
            return {};
        }
        
    }

    async deactivateUser(userID: string): Promise<object> {
        try {
            if (!this.#apiKey) throw new Error("A Passage API key is needed to make a deactivateUser request");

            let userData: object = await axios.patch(
                `https://api.passage.id/v1/apps/${this.appID}/users/${userID}/deactivate`,
                null, // note that this null is required as axios.post has different param order than axios.get
                {
                    headers: {
                        'Authorization': `Bearer ${this.#apiKey}`,
                    }
                }
            )
                .catch(err => {
                    throw new Error(`Could not deactivate user. HTTP status: ${err.response.status}`);
                })
                .then(res => {
                    return res.data.user;
                });
    
            return userData;
        } catch(e) {
            console.warn(e);
            return {};
        }
        
    }

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
