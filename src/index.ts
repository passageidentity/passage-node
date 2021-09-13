import { Request, NextFunction, Response } from "express-serve-static-core";

import jwt from "jsonwebtoken";
import axios from "axios";
import base64 from "base-64";

import { AuthStrategy } from './types/AuthStrategy';
import { PassageConfig } from './types/PassageConfig';

declare global{
    namespace Express {
        export interface Response {
            passage: Passage
        }
    }
}


export default function initialize(config: PassageConfig) {
    
    if (!config.appID) throw new Error("Passage requires an App ID");
    
    let passage = new Passage(config.appID);
    switch (passage.authStrategy) {
        case "COOKIE":
            return (req: Request, res: Response, next: NextFunction) => {
                passage.authenticateRequestWithCookie(req, res, next);
            }
        case "HEADER":
            return (req: Request, res: Response, next: NextFunction) => {
                passage.authenticateRequestWithHeader(req, res, next);
            }
        default:
            return (req: Request, res: Response, next: NextFunction) => {
                passage.authenticateRequest(req, res, next);
            }
    }
}

export class Passage {
    appID: string;
    #publicKey: string;
    authStrategy: AuthStrategy;

    constructor(appID: string, config?: any) {
        this.appID = appID;
        this.#publicKey = '';
        this.authStrategy = config?.authStrategy ? config.authStrategy : "DEFAULT";
    }

    async authenticateRequest(req: Request, res: Response, next: NextFunction) {
        try {
            return await this.authenticateRequestWithCookie(req, res, next);
        } catch(e) {
            try {
                return this.authenticateRequestWithHeader(req, res, next);
            } catch(e) {
                console.warn(`Failed to authenticate request: ${e}`);
                return res.send("Failed to authenticate request.");
            }
        }
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
        let userData: object = await axios.get(`https://api.passage.id/v1/apps/${this.appID}/users/${userID}`)
        .catch(err => {
            throw new Error(`Could not fetch user. HTTP status: ${err.response.status}`);
        })
        .then(res => {
            return res.data.app;
        });

        return userData;
    }

    async activateUser(userID: string): Promise<object> {
        let userData: object = await axios.get(`https://api.passage.id/v1/apps/${this.appID}/users/${userID}/activate`)
            .catch(err => {
                throw new Error(`Could not activate user. HTTP status: ${err.response.status}`);
            })
            .then(res => {
                return res.data.app;
            });

        return userData;
    }

    async deactivateUser(userID: string): Promise<object> {
        let userData: object = await axios.get(`https://api.passage.id/v1/apps/${this.appID}/users/${userID}/deactivate`)
            .catch(err => {
                throw new Error(`Could not deactivate user. HTTP status: ${err.response.status}`);
            })
            .then(res => {
                return res.data.app;
            });

        return userData;
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
