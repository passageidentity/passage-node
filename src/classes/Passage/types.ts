import { FetchAPI } from '../../generated';

export type PassageConfig = {
    /** The App ID for your Passage Application. */
    appId: string;
    /** The API Key for your Passage Application. */
    apiKey: string;
    /** Optional fetch API to use. Will use node-fetch by default if not provided. */
    fetchApi?: FetchAPI;
};
