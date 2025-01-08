import { PassageInstanceConfig } from '../PassageBase';
import { Auth } from '../Auth';
import { User } from '../User';
import { PassageConfig } from './types';
import { Configuration, ConfigurationParameters, FetchAPI } from '../../generated';

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
        if (!config.appId) {
            throw new Error('A Passage App ID is required. Please include {appId: YOUR_APP_ID, apiKey: YOUR_API_KEY}.');
        }
        if (!config.apiKey) {
            throw new Error(
                'A Passage API Key is required. Please include {appId: YOUR_APP_ID, apiKey: YOUR_API_KEY}.',
            );
        }

        const instanceConfig: PassageInstanceConfig = {
            appId: config.appId,
            apiConfiguration: this.configureApi({
                accessToken: config.apiKey,
                fetchApi: config.fetchApi,
            }),
        };

        this.user = new User(instanceConfig);
        this.auth = new Auth(instanceConfig);
    }

    /**
     * Configure the API with the provided configuration parameters.
     * @param {ConfigurationParameters} config The configuration parameters
     * @return {Configuration} The configured API
     */
    private configureApi(config?: ConfigurationParameters): Configuration {
        const fetchApi = config?.fetchApi ?? (fetch as unknown as FetchAPI);
        const configuration = new Configuration({
            accessToken: config?.accessToken,
            fetchApi,
            headers: {
                ...config?.headers,
                'Authorization': `Bearer ${config?.accessToken}`,
                'Passage-Version': process.env.npm_package_version || '',
            },
            middleware: [],
        });

        return configuration;
    }
}
