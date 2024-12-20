import { FetchAPI } from '../../generated';

export { AppInfo, Layouts, LayoutConfig, UserMetadataFieldType, UserMetadataField } from '../../generated';
export type PassageConfig = {
    /** The App ID for your Passage Application. */
    appID: string;
    /** The API Key for your Passage Application. */
    apiKey: string;
    /** Optional fetch API to use. Will use node-fetch by default if not provided. */
    fetchApi?: FetchAPI;
};
