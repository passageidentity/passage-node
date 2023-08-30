import { FetchError } from 'node-fetch';
import fetch from 'node-fetch';
import { PassageConfig } from '../types/PassageConfig';
import { PassageError } from './PassageError';

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

        if (this.#apiKey) {
            this.#authorizationHeader = {
                Authorization: `Bearer ${this.#apiKey}`,
            };
        } else {
            this.#authorizationHeader = undefined;
        }

        this.#configuration = new Configuration({
            apiKey: this.#apiKey,
            fetchApi: fetch as unknown as ConfigurationParameters['fetchApi'],
            headers: this.#authorizationHeader,
            middleware: [],
        });
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
            const client = new UsersApi(this.#configuration);

            const response = await client.getUser({
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
            const client = new UsersApi(this.#configuration);

            const response = await client.deactivateUser({
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
            const client = new UsersApi(this.#configuration);

            const response = await client.updateUser({
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
            const client = new UsersApi(this.#configuration);

            const response = await client.activateUser({
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
            const client = new UsersApi(this.#configuration);

            const response = await client.createUser({
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
            const client = new UsersApi(this.#configuration);

            await client.deleteUser({
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
     * Revoke a user's device using their user ID and the device ID.
     *
     * @param {string} userID The Passage user ID
     * @param {string} deviceID The Passage user's device ID
     * @return {Promise<boolean>}
     */
    async revokeDevice(userID: string, deviceID: string): Promise<boolean> {
        this._apiKeyCheck();

        try {
            const client = new UserDevicesApi(this.#configuration);

            await client.deleteUserDevices({
                appId: this.#appID,
                deviceId: deviceID,
                userId: userID,
            });

            return true;
        } catch (err) {
            throw new PassageError("Could not delete user's device", err as FetchError);
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
