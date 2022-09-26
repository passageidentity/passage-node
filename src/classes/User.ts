/* eslint-disable no-unused-vars */
import { PassageConfig } from "../types/PassageConfig";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { PassageError } from "./PassageError";

interface UserEventInfo {
  type: string;
  timestamp: string;
  id: string;
  ip_addr: string;
  user_agent: string;
}

interface WebAuthnDevices {
  id: string;
  cred_id: string;
  friendly_name: string;
  usage_count: number;
  updated_at: string;
  created_at: string;
  last_login_at: string;
}

enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
}
type UserStatusEnum = keyof typeof UserStatus;

interface PossibleUserUpdateAttributes {
  email: string;
  phone: string;
}

type UserAttributes =
  | Pick<PossibleUserUpdateAttributes, "email">
  | Pick<PossibleUserUpdateAttributes, "phone">;

export interface Metadata {
  [key: string]: boolean | string | number;
}

interface UserObject {
  created_at: string;
  updated_at: string;
  status: UserStatusEnum;
  email_verified: boolean;
  phone_verified: boolean;
  email: string;
  phone: string;
  id: string;
  last_login_at: string;
  login_count: number;
  recent_events: Array<UserEventInfo>;
  webauthn: boolean;
  webauthn_devices: Array<WebAuthnDevices>;
  user_metadata?: Metadata;
}

interface UpdateUserPayload {
  email?: string;
  phone?: string;
  user_metadata?: Metadata;
}

interface CreateUserPayload {
  email?: string;
  phone?: string;
  user_metadata?: Metadata;
}

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
      throw new PassageError("A Passage API key is needed.");
    }

    const userData: UserObject = await axios
      .get(
        `https://api.passage.id/v1/apps/${this.#appID}/users/${userID}`,
        this.#authorizationHeader
      )
      .catch((err: AxiosError) => {
        throw new PassageError("Could not fetch user.", err);
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
      throw new PassageError("A Passage API key is needed.");
    }
    const userData: UserObject = await axios
      .patch(
        `https://api.passage.id/v1/apps/${
          this.#appID
        }/users/${userID}/deactivate`,
        null, // note that this null is required as axios.patch has different param order than axios.get
        this.#authorizationHeader
      )
      .catch((err: AxiosError) => {
        throw new PassageError("Could not deactivate user.", err);
      })
      .then((res) => {
        return res.data.user;
      });

    return userData;
  }

  /**
   * Update a user.
   *
   * @param {string} userID The passage user ID
   * @param {UpdateUserPayload} payload The user attributes to be updated
   * @return {Promise<UserObject>} Pasasge User Object
   */
  async update(
    userID: string,
    payload: UpdateUserPayload
  ): Promise<UserObject> {
    if (!this.#apiKey) {
      throw new PassageError("A Passage API key is needed.");
    }
    const userData: UserObject = await axios
      .patch(
        `https://api.passage.id/v1/apps/${this.#appID}/users/${userID}`,
        payload,
        this.#authorizationHeader
      )
      .catch((err: AxiosError) => {
        throw new PassageError("Could not update user.", err);
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
      throw new PassageError("A Passage API key is needed");
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
        throw new PassageError("Could not activate user", err);
      })
      .then((res) => {
        return res.data.user;
      });

    return userData;
  }

  /**
   * Create a user.
   *
   * @param {CreateUserPayload} payload To create the user.
   * @return {Promise<UserObject>} Passage User object
   */
  async create(payload: CreateUserPayload): Promise<UserObject> {
    if (!this.#apiKey) {
      throw new PassageError("A Passage API key is needed");
    }
    const userData: UserObject = await axios
      .post(
        `https://api.passage.id/v1/apps/${this.#appID}/users/`,
        payload,
        this.#authorizationHeader
      )
      .catch((err: AxiosError) => {
        throw new PassageError("Could not create user", err);
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
      throw new PassageError("A Passage API key is needed");
    }
    const response: number = await axios
      .delete(
        `https://api.passage.id/v1/apps/${this.#appID}/users/${userID}`,
        this.#authorizationHeader
      )
      .catch((err: AxiosError) => {
        throw new PassageError("Could not delete user.", err);
      })
      .then((res) => {
        return res.status.valueOf();
      });

    return response === 200;
  }

  /**
   * Get a user's devices using their user ID.
   *
   * @param {string} userID The Passage user ID
   * @return {Promise<Array<WebAuthnDevices>>} List of devices
   */
  async listDevices(userID: string): Promise<Array<WebAuthnDevices>> {
    if (!this.#apiKey) {
      throw new PassageError("A Passage API key is needed");
    }

    const devices: Array<WebAuthnDevices> = await axios
      .get(
        `https://api.passage.id/v1/apps/${this.#appID}/users/${userID}/devices`,
        this.#authorizationHeader
      )
      .catch((err: AxiosError) => {
        throw new PassageError("Could not fetch user's devices.", err);
      })
      .then((res) => {
        return res.data.devices;
      });

    return devices;
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
      throw new PassageError("A Passage API key is needed");
    }

    const success: boolean = await axios
      .delete(
        `https://api.passage.id/v1/apps/${
          this.#appID
        }/users/${userID}/devices/${deviceID}`,
        this.#authorizationHeader
      )
      .catch((err: AxiosError) => {
        throw new PassageError("Could not delete user's device", err);
      })
      .then(() => {
        return true;
      });

    return success;
  }

  /**
   * Revokes all of a user's Refresh Tokens using their User ID.
   *
   * @param {string} userID The Passage user ID
   * @return {Promise<boolean>}
   */
  async signOut(userID: string): Promise<boolean> {
    if (!this.#apiKey) {
      throw new PassageError("A Passage API key is needed");
    }

    return axios
      .delete(
        `https://api.passage.id/v1/apps/${this.#appID}/users/${userID}/tokens/`,
        this.#authorizationHeader
      )
      .catch((err: AxiosError) => {
        throw new PassageError("Could not revoke user's refresh tokens.", err);
      })
      .then(() => {
        return true;
      });
  }
}
