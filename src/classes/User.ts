/* eslint-disable no-unused-vars */
import { PassageConfig } from "../types/PassageConfig";
import axios from "axios";

interface PossibleUserUpdateAttributes {
  email: string;
  phone: string;
}

interface UserEventInfo {
  type: string;
  timestamp: string;
  id: string;
  ip_addr: string;
  user_agent: string;
}

interface WebAuthnDevices {
  id: string;
  friendly_name: string;
  usage_count: string;
  last_used: string;
}

enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    PENDING = "pending",
}
type UserStatusEnum = keyof typeof UserStatus;

interface UserObject {
  created_at: string;
  updated_at: string;
  status: UserStatusEnum;
  email_verified: boolean;
  email: string;
  phone: string;
  id: string;
  last_login_at: string;
  login_count: number;
  recent_events: Array<UserEventInfo>;
  webauthn: boolean;
  webauthn_devices: Array<WebAuthnDevices>;
}

type UserAttributes =
  | Pick<PossibleUserUpdateAttributes, "email">
  | Pick<PossibleUserUpdateAttributes, "phone">;

/**
 * Passage User Class
 */
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
        this.#appID = config.appID ? config.appID : "";
        this.#apiKey = config.apiKey ? config.apiKey : "";
        this.id = "";

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
            throw new Error("A Passage API key is needed to make a getUser request");
        }

        const userData: UserObject = await axios
            .get(
                `https://api.passage.id/v1/apps/${this.#appID}/users/${userID}`,
                this.#authorizationHeader
            )
            .catch((err) => {
                throw new Error(
                    `Could not fetch user. HTTP status: ${err.response.status}`
                );
            })
            .then((res) => {
                return res.data.user;
            });

        return userData;
    }

    /**
   * Deactivate a user using their user ID.
   *
   * @param {string} userID The Passage user ID
   * @return {Promise<UserObject>} Passage User object
   */
    async deactivate(userID: string): Promise<UserObject> {
        if (!this.#apiKey) {
            throw new Error(
                "A Passage API key is needed to make a deactivateUser request"
            );
        }
        const userData: UserObject = await axios
            .patch(
                `https://api.passage.id/v1/apps/${
                    this.#appID
                }/users/${userID}/deactivate`,
                null, // note that this null is required as axios.patch has different param order than axios.get
                this.#authorizationHeader
            )
            .catch((err) => {
                throw new Error(
                    `Could not deactivate user. HTTP status: ${err.response.status}`
                );
            })
            .then((res) => {
                return res.data.user;
            });

        return userData;
    }

    /**
   * Update a user's email.
   *
   * @param {string} userID The passage user ID
   * @param {UserAttributes} userAttributes The user attributes to be updated
   * @return {Promise<UserObject>} Pasasge User Object
   */
    async update(
        userID: string,
        userAttributes: UserAttributes
    ): Promise<UserObject> {
        if (!this.#apiKey) {
            throw new Error(
                "A Passage API key is needed to make a user update request"
            );
        }
        const userData: UserObject = await axios
            .patch(
                `https://api.passage.id/v1/apps/${this.#appID}/users/${userID}`,
                userAttributes,
                this.#authorizationHeader
            )
            .catch((err) => {
                throw new Error(
                    `Could not update user attributes (${Object.keys(userAttributes).join(
                        ", "
                    )}). HTTP status: ${err.response.status}`
                );
            })
            .then((res) => {
                return res.data.user;
            });

        return userData;
    }

    /**
   * Activate a user using their user ID.
   *
   * @param {string} userID The passage user ID
   * @return {Promise<UserObject>} Passage User object
   */
    async activate(userID: string): Promise<UserObject> {
        if (!this.#apiKey) {
            throw new Error(
                "A Passage API key is needed to make an activateUser request"
            );
        }
        const userData: UserObject = await axios
            .patch(
                `https://api.passage.id/v1/apps/${
                    this.#appID
                }/users/${userID}/activate`,
                null, // note that this null is required as axios.patch has different param order than axios.get
                this.#authorizationHeader
            )
            .catch((err) => {
                throw new Error(
                    `Could not activate user. HTTP status: ${err.response.status}`
                );
            })
            .then((res) => {
                return res.data.user;
            });

        return userData;
    }

    /**
   * Create a user using their user ID.
   *
   * @param {UserAttributes} identifier The identifier for the new user.
   * Either an E164 phone number or email address.
   * @return {Promise<UserObject>} Passage User object
   */
    async create(identifier: UserAttributes): Promise<UserObject> {
        if (!this.#apiKey) {
            throw new Error(
                "A Passage API key is needed to make an createUser request"
            );
        }
        const userData: UserObject = await axios
            .post(
                `https://api.passage.id/v1/apps/${this.#appID}/users/`,
                identifier,
                this.#authorizationHeader
            )
            .catch((err) => {
                throw new Error(
                    `Could not create user with the identifier: ${JSON.stringify(
                        identifier
                    )}. HTTP Status: ${err.response.status}.`
                );
            })
            .then((res) => {
                return res.data.user;
            });
        return userData;
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
            throw new Error(
                "A Passage API key is needed to make an activateUser request"
            );
        }
        const response: number = await axios
            .delete(
                `https://api.passage.id/v1/apps/${this.#appID}/users/${userID}`,
                this.#authorizationHeader
            )
            .catch((err) => {
                throw new Error(
                    `Could not delete user with the userID: ${userID}. HTTP Status: ${err.response.status}`
                );
            })
            .then((res) => {
                return res.status.valueOf();
            });

        return response === 200;
    }
}
