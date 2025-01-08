import { Passage } from './Passage';
import { PassageConfig } from './types';

describe('Passage Class Constructor', () => {
    it('should throw an error if appID is not provided', () => {
        const config: PassageConfig = {
            appId: '',
            apiKey: 'test_api_key',
        };

        expect(() => new Passage(config)).toThrow(Error);
        expect(() => new Passage(config)).toThrow(
            'A Passage App ID is required. Please include {appId: YOUR_APP_ID, apiKey: YOUR_API_KEY}.',
        );
    });

    it('should throw an error if apiKey is not provided', () => {
        const config: PassageConfig = {
            appId: 'test_app_id',
            apiKey: '',
        };

        expect(() => new Passage(config)).toThrow(Error);
        expect(() => new Passage(config)).toThrow(
            'A Passage API Key is required. Please include {appId: YOUR_APP_ID, apiKey: YOUR_API_KEY}.',
        );
    });

    it('should initialize Passage instance correctly with valid config', () => {
        const config: PassageConfig = {
            appId: 'test_app_id',
            apiKey: 'test_api_key',
        };

        const passage = new Passage(config);

        expect(passage).toBeInstanceOf(Passage);
        expect(passage.user).toBeDefined();
        expect(passage.auth).toBeDefined();
    });

    it('should set fetchApi correctly if provided', () => {
        const mockFetchApi = jest.fn();
        const config: PassageConfig = {
            appId: 'test_app_id',
            apiKey: 'test_api_key',
            fetchApi: mockFetchApi,
        };

        const passage = new Passage(config);

        expect(passage).toBeInstanceOf(Passage);
        expect(passage.user).toBeDefined();
        expect(passage.auth).toBeDefined();
        expect(passage.user['config'].apiConfiguration.fetchApi).toBe(mockFetchApi);
        expect(passage.auth['config'].apiConfiguration.fetchApi).toBe(mockFetchApi);
    });
});
