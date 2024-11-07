import { Passage } from './Passage';
import { PassageConfig } from '../../types/PassageConfig';
import { PassageError } from '../PassageError';

describe('Passage Class Constructor', () => {
    it('should throw an error if appID is not provided', () => {
        const config: PassageConfig = {
            appID: '',
            apiKey: 'test_api_key',
        };

        expect(() => new Passage(config)).toThrow(PassageError);
        expect(() => new Passage(config)).toThrow('A Passage appID is required. Please include {appID: YOUR_APP_ID, apiKey: YOUR_API_KEY}.');
    });

    it('should throw an error if apiKey is not provided', () => {
        const config: PassageConfig = {
            appID: 'test_app_id',
            apiKey: '',
        };

        expect(() => new Passage(config)).toThrow(PassageError);
        expect(() => new Passage(config)).toThrow('A Passage API Key is required. Please include {appID: YOUR_APP_ID, apiKey: YOUR_API_KEY}.');
    });

    it('should initialize Passage instance correctly with valid config', () => {
        const config: PassageConfig = {
            appID: 'test_app_id',
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
            appID: 'test_app_id',
            apiKey: 'test_api_key',
            fetchApi: mockFetchApi,
        };

        const passage = new Passage(config);

        expect(passage).toBeInstanceOf(Passage);
        expect(passage.user).toBeDefined();
        expect(passage.auth).toBeDefined();
        expect(passage['_apiConfiguration'].fetchApi).toBe(mockFetchApi);
    });
});
