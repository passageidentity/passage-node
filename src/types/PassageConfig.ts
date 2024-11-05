import { FetchAPI } from '../generated';
import { AuthStrategy } from './AuthStrategy';

export type PassageConfig = {
    /** The App ID for your Passage Application. */
    appID: string;
    /** The API Key for your Passage Application. */
    apiKey: string;
    /** Optional fetch API to use. Will use node-fetch by default if not provided. */
    fetchApi?: FetchAPI;
    /**
     * @deprecated This will be removed in the next major release in favor of directly validating JWTs with Passage.auth.validateJwt
     */
    authStrategy?: AuthStrategy;
};
