import { AuthStrategy } from "../types/AuthStrategy";
import User from "./User";
import jwt from "jsonwebtoken";
import { Request, NextFunction, Response } from "express-serve-static-core";
import base64 from "base-64";
import axios from "axios";


export default class Passage {
    appID: string;
    #publicKey: string;
    #apiKey: string;
    authStrategy: AuthStrategy;
    authorizationHeader: object | undefined;
    user: User;

    constructor(config?: any) {
        this.appID = config.appID;
        this.#apiKey = config.apiKey ? config.apiKey : '';
        this.user = new User(config);

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
 