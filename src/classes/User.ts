import fetch, { FetchError } from 'node-fetch';
import { PassageConfig } from '../types/PassageConfig';
import { PassageError } from './PassageError';
import passageNodeConfig from '../utils/config.json';

import {
    Configuration,
    ConfigurationParameters,
    CreateUserRequest,
    HTTPHeaders,
    TokensApi,
    UpdateUserRequest,
    UsersApi,
    UserDevicesApi,
    UserInfo,
    WebAuthnDevices,
} from '../generated';

/***/
export default class User {
    #appID: string;
    #apiKey: string;
    #authorizationHeader?: HTTPHeaders;
    #client: UsersApi;
    #configuration: Configuration;
    id: string;

    /**
     * Initialize a new Passage User instance.
     *
     * @param {PassageConfig} config The default config for Passage and User initialization
     */
    constructor(config: PassageConfig) {
        this.#appID = config.appID ? config.appID : '';
        this.#apiKey = config.apiKey ? config.apiKey : '';
        this.id = '';
        this.#authorizationHeader = {
            'Passage-Version': passageNodeConfig.version,
        };

        this.#configuration = new Configuration({
            accessToken: this.#apiKey,
            apiKey: this.#apiKey,
            fetchApi: fetch as unknown as ConfigurationParameters['fetchApi'],
            headers: this.#authorizationHeader,
            middleware: [],
        });

        this.#client = new UsersApi(this.#configuration);
    }

    /**
     * Check if API key exists for this Passage instance
     * @throws {PassageError} If the API key is missing.
     */
    private _apiKeyCheck(): void {
        if (!this.#apiKey) {
            throw new PassageError('A Passage API key is needed.');
        }
    }

    /**
     * Get a user's object using their user ID.
     *
     * @param {string} userID The Passage user ID
     * @return {Promise<UserInfo>} Passage User object
     */
    async get(userID: string): Promise<UserInfo> {
        this._apiKeyCheck();

        try {
            const response = await this.#client.getUser({
                appId: this.#appID,
                userId: userID,
            });

            return response.user;
        } catch (err) {
            throw new PassageError('Could not fetch user.', err as FetchError);
        }
    }

    /**
     * Deactivate a user using their user ID.
     *
     * @param {string} userID The Passage user ID
     * @return {Promise<UserInfo>} Passage User object
     */
    async deactivate(userID: string): Promise<UserInfo> {
        this._apiKeyCheck();

        try {
            const response = await this.#client.deactivateUser({
                appId: this.#appID,
                userId: userID,
            });

            return response.user;
        } catch (err) {
            throw new PassageError('Could not deactivate user.', err as FetchError);
        }
    }

    /**
     * Update a user.
     *
     * @param {string} userID The passage user ID
     * @param {UpdateUserPayload} payload The user attributes to be updated
     * @return {Promise<UserInfo>} Pasasge User Object
     */
    async update(userID: string, payload: UpdateUserRequest): Promise<UserInfo> {
        this._apiKeyCheck();

        try {
            const response = await this.#client.updateUser({
                appId: this.#appID,
                updateUserRequest: payload,
                userId: userID,
            });

            return response.user;
        } catch (err) {
            throw new PassageError('Could not update user.', err as FetchError);
        }
    }

    /**
     * Activate a user using their user ID.
     *
     * @param {string} userID The passage user ID
     * @return {Promise<UserInfo>} Passage User object
     */
    async activate(userID: string): Promise<UserInfo> {
        this._apiKeyCheck();

        try {
            const response = await this.#client.activateUser({
                appId: this.#appID,
                userId: userID,
            });
            return response.user;
        } catch (err) {
            throw new PassageError('Could not activate user', err as FetchError);
        }
    }

    /**
     * Create a user.
     *
     * @param {CreateUserRequest} payload To create the user.
     * @return {Promise<UserInfo>} Passage User object
     */
    async create(payload: CreateUserRequest): Promise<UserInfo> {
        this._apiKeyCheck();

        try {
            const response = await this.#client.createUser({
                appId: this.#appID,
                createUserRequest: payload,
            });

            return response.user;
        } catch (err) {
            throw new PassageError('Could not create user', err as FetchError);
        }
    }

    /**
     * Delete a user using their user ID.
     *
     * @param {string} userID The userID used to delete the corresponding user.
     * Either an E164 phone number or email address.
     * @return {boolean} True if user was deleted, false if not
     */
    async delete(userID: string): Promise<boolean> {
        this._apiKeyCheck();

        try {
            await this.#client.deleteUser({
                appId: this.#appID,
                userId: userID,
            });

            return true;
        } catch (err) {
            throw new PassageError('Could not delete user.', err as FetchError);
        }
    }

    /**
     * Get a user's devices using their user ID.
     *
     * @param {string} userID The Passage user ID
     * @return {Promise<Array<WebAuthnDevices>>} List of devices
     */
    async listDevices(userID: string): Promise<Array<WebAuthnDevices>> {
        this._apiKeyCheck();

        try {
            const client = new UserDevicesApi(this.#configuration);

            const response = await client.listUserDevices({
                appId: this.#appID,
                userId: userID,
            });

            return response.devices;
        } catch (err) {
            throw new PassageError("Could not fetch user's devices.", err as FetchError);
        }
    }

    /**
     * Revokes all of a user's Refresh Tokens using their User ID.
     *
     * @param {string} userID The Passage user ID
     * @return {Promise<boolean>}
     */
    async signOut(userID: string): Promise<boolean> {
        if (!this.#apiKey) {
            throw new PassageError('A Passage API key is needed');
        }

        try {
            const client = new TokensApi(this.#configuration);

            await client.revokeUserRefreshTokens({
                appId: this.#appID,
                userId: userID,
            });
            return true;
        } catch (err) {
            throw new PassageError("Could not revoke user's refresh tokens.", err as FetchError);
        }
    }
}
