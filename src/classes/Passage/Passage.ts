import { PassageInstanceConfig } from '../PassageBase';
import { Auth } from '../Auth';
import { User } from '../User';
import { PassageConfig } from './types';
import { Configuration, ConfigurationParameters, FetchAPI } from '../../generated';
import { PassageError } from '../PassageError';

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
            throw new PassageError('A Passage appID is required. Please include {appID: YOUR_APP_ID, apiKey: YOUR_API_KEY}.');
        }
        if (!config.apiKey) {
            throw new PassageError(
                'A Passage API Key is required. Please include {appID: YOUR_APP_ID, apiKey: YOUR_API_KEY}.',
            );
        }

        const instanceConfig: PassageInstanceConfig = {
            appId: config.appID,
            apiConfiguration: this.configureApi({
                accessToken: config.apiKey,
                fetchApi: config.fetchApi,
            }),
        };

        this.user = new User(instanceConfig);
        this.auth = new Auth(instanceConfig);
    }

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
