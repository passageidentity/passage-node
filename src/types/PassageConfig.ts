import { ServerResponse as HTTPServerResponse } from 'http';
import { AuthStrategy } from './AuthStrategy';

export type PassageConfig = {
    appID: string;
    apiKey?: string;
    authStrategy?: AuthStrategy;
    failureRedirect?: string;
};

export interface ServerResponse extends HTTPServerResponse {
    userID?: string;
}
