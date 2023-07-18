/* eslint-disable no-unused-vars */
import { FetchError } from 'node-fetch';
import fetch from '../utils/fetch';
import { PassageConfig } from '../types/PassageConfig';
import { WebAuthnDevices, UserObject, UpdateUserPayload, CreateUserPayload } from '../types/User';
import { PassageError } from './PassageError';

/***/
export default class User {
    #appID: string;
    #apiKey: string;
    #authorizationHeader: object | undefined;
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
                headers: {
                    Authorization: `Bearer ${this.#apiKey}`,
                },
            };
        } else {
            this.#authorizationHeader = undefined;
        }
    }

    /**
     * Get a user's object using their user ID.
     *
     * @param {string} userID The Passage user ID
     * @return {Promise<UserObject>} Passage User object
     */
    async get(userID: string): Promise<UserObject> {
        if (!this.#apiKey) {
            throw new PassageError('A Passage API key is needed.');
        }

        try {
            const response = await fetch({
                ...this.#authorizationHeader,
                method: 'GET',
                url: `https://api.passage.id/v1/apps/${this.#appID}/users/${userID}`,
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
     * @return {Promise<UserObject>} Passage User object
     */
    async deactivate(userID: string): Promise<UserObject> {
        if (!this.#apiKey) {
            throw new PassageError('A Passage API key is needed.');
        }

        try {
            const response = await fetch({
                ...this.#authorizationHeader,
                method: 'PATCH',
                url: `https://api.passage.id/v1/apps/${this.#appID}/users/${userID}/deactivate`,
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
     * @return {Promise<UserObject>} Pasasge User Object
     */
    async update(userID: string, payload: UpdateUserPayload): Promise<UserObject> {
        if (!this.#apiKey) {
            throw new PassageError('A Passage API key is needed.');
        }

        try {
            const response = await fetch({
                ...this.#authorizationHeader,
                body: payload,
                method: 'PATCH',
                url: `https://api.passage.id/v1/apps/${this.#appID}/users/${userID}`,
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
     * @return {Promise<UserObject>} Passage User object
     */
    async activate(userID: string): Promise<UserObject> {
        if (!this.#apiKey) {
            throw new PassageError('A Passage API key is needed');
        }

        try {
            const response = await fetch({
                ...this.#authorizationHeader,
                method: 'PATCH',
                url: `https://api.passage.id/v1/apps/${this.#appID}/users/${userID}/activate`,
            });

            return response.user;
        } catch (err) {
            throw new PassageError('Could not activate user', err as FetchError);
        }
    }

    /**
     * Create a user.
     *
     * @param {CreateUserPayload} payload To create the user.
     * @return {Promise<UserObject>} Passage User object
     */
    async create(payload: CreateUserPayload): Promise<UserObject> {
        if (!this.#apiKey) {
            throw new PassageError('A Passage API key is needed');
        }

        try {
            const response = await fetch({
                ...this.#authorizationHeader,
                body: payload,
                method: 'POST',
                url: `https://api.passage.id/v1/apps/${this.#appID}/users/`,
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
        if (!this.#apiKey) {
            throw new PassageError('A Passage API key is needed');
        }

        try {
            await fetch({
                ...this.#authorizationHeader,
                method: 'DELETE',
                url: `https://api.passage.id/v1/apps/${this.#appID}/users/${userID}`,
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
        if (!this.#apiKey) {
            throw new PassageError('A Passage API key is needed');
        }

        try {
            const response = await fetch({
                ...this.#authorizationHeader,
                method: 'GET',
                url: `https://api.passage.id/v1/apps/${this.#appID}/users/${userID}/devices`,
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
        if (!this.#apiKey) {
            throw new PassageError('A Passage API key is needed');
        }

        try {
            await fetch({
                ...this.#authorizationHeader,
                method: 'DELETE',
                url: `https://api.passage.id/v1/apps/${this.#appID}/users/${userID}/devices/${deviceID}`,
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
            await fetch({
                ...this.#authorizationHeader,
                method: 'DELETE',
                url: `https://api.passage.id/v1/apps/${this.#appID}/users/${userID}/tokens/`,
            });

            return true;
        } catch (err) {
            throw new PassageError("Could not revoke user's refresh tokens.", err as FetchError);
        }
    }
}
