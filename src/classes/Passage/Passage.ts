import { PassageConfig } from '../../types/PassageConfig';
import apiConfiguration from '../../utils/apiConfiguration';
import { PassageInstanceConfig } from '../PassageBase';
import { Auth } from '../Auth';
import { User } from '../User';

/**
 * Passage Class
 */
export class Passage {
    public readonly user: User;
    public readonly auth: Auth;

    /**
     * Initialize a new Passage instance.
     * @param {PassageConfig} config The default config for Passage initialization
     */
    public constructor(config: PassageConfig) {
        if (!config.appID) {
            throw new Error(
                'A Passage appID is required. Please include {appID: YOUR_APP_ID, apiKey: YOUR_API_KEY}.',
            );
        }
        if (!config.apiKey) {
            throw new Error(
                'A Passage API Key is required. Please include {appID: YOUR_APP_ID, apiKey: YOUR_API_KEY}.',
            );
        }

        const instanceConfig: PassageInstanceConfig = {
            appId: config.appID,
            apiConfiguration: apiConfiguration({
                accessToken: config.apiKey,
                fetchApi: config.fetchApi,
            }),
        };

        this.user = new User(instanceConfig);
        this.auth = new Auth(instanceConfig);
    }
}
