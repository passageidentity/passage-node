/* eslint-disable no-unused-vars */
import { FetchError } from 'node-fetch';
import fetch from '../utils/fetch';
import { PassageConfig } from '../types/PassageConfig';
import { UserObject } from '../types/User';
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

    // /**
    //  * Get a user's object using their user ID.
    //  *
    //  * @param {string} userID The Passage user ID
    //  * @return {Promise<UserObject>} Passage User object
    //  */
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


}
