import { Configuration, ConfigurationParameters, FetchAPI } from '../generated';
import fetch from 'node-fetch';

/**
 * Initialize defaults for Configuration
 *
 * @param {ConfigurationParameters} config options for Configuration.
 * @return {Configuration} Configuration object
 */
export default function apiConfiguration(config?: ConfigurationParameters): Configuration {
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
