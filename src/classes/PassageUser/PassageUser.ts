import { PassageBase, PassageInstanceConfig } from "../PassageBase";
import { CreateUserRequest, ResponseError, TokensApi, UpdateUserRequest, UserDevicesApi, UserInfo, UsersApi, WebAuthnDevices } from "../../generated";
import { PassageError } from "../PassageError";

export class PassageUser extends PassageBase {
    private usersApi;
    private userDevicesApi;

    constructor(protected config: PassageInstanceConfig) {
        super(config);
        this.usersApi = new UsersApi(this.config.apiConfiguration);
        this.userDevicesApi = new UserDevicesApi(this.config.apiConfiguration);
    }

    /**
     * Get a user's object using their user ID.
     *
     * @param {string} userId The Passage user ID
     * @return {Promise<UserInfo>} Passage User object
     */
    public async get(userId: string): Promise<UserInfo> {
        try {
            const response = await this.usersApi.getUser({
                userId,
                appId: this.config.appId,
            });

            return response.user;
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError(err, 'Could not fetch user');
            }

            throw err;
        }
    }

    /**
     * Get a user's object using their user identifier.
     *
     * @param {string} identifier The Passage user email or phone number
     * @return {Promise<UserInfo>} Passage User object
     */
    public async getByIdentifier(identifier: string): Promise<UserInfo> {    
        try {
            const response = await this.usersApi.listPaginatedUsers({
                appId: this.config.appId,
                limit: 1,
                identifier: identifier.toLowerCase(),
            });

            const users = response.users;
            if (!users.length) {
                throw new PassageError('Could not find user with that identifier.');
            }

            return this.get(users[0].id);
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError(err, 'Could not fetch user by identifier');
            }

            throw err;
        }
    }

    /**
     * Activate a user using their user ID.
     *
     * @param {string} userId The passage user ID
     * @return {Promise<UserInfo>} Passage User object
     */
    public async activate(userId: string): Promise<UserInfo> {
        try {
            const response = await this.usersApi.activateUser({
                userId,
                appId: this.config.appId,
            });
            return response.user;
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError(err, 'Could not activate user');
            }
            throw err;
        }
    }

    /**
     * Deactivate a user using their user ID.
     *
     * @param {string} userId The Passage user ID
     * @return {Promise<UserInfo>} Passage User object
     */
    public async deactivate(userId: string): Promise<UserInfo> {    
        try {
            const response = await this.usersApi.deactivateUser({
                userId,
                appId: this.config.appId,
            });

            return response.user;
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError(err, 'Could not deactivate user');
            }

            throw err;
        }
    }

    /**
     * Update a user.
     *
     * @param {string} userId The passage user ID
     * @param {UpdateUserRequest} options The user attributes to be updated
     * @return {Promise<UserInfo>} Pasasge User Object
     */
    public async update(userId: string, options: UpdateUserRequest): Promise<UserInfo> {
        try {
            const response = await this.usersApi.updateUser({
                userId,
                appId: this.config.appId,
                updateUserRequest: options,
            });

            return response.user;
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError(err, 'Could not update user');
            }

            throw err;
        }
    }

    /**
     * Create a user.
     *
     * @param {CreateUserRequest} args Arguments for creating a user
     * @return {Promise<UserInfo>} Passage User object
     */
    public async create(args: CreateUserRequest): Promise<UserInfo> {    
        try {
            const response = await this.usersApi.createUser({
                appId: this.config.appId,
                createUserRequest: args,
            });

            return response.user;
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError(err, 'Could not create user');
            }

            throw err;
        }
    }

    /**
     * Delete a user using their user ID.
     *
     * @param {string} userId The userID used to delete the corresponding user.
     * Either an E164 phone number or email address.
     * @return {boolean} True if user was deleted, false if not
     */
    public async delete(userId: string): Promise<boolean> {    
        try {
            await this.usersApi.deleteUser({
                userId,
                appId: this.config.appId,
            });
            return true;
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError(err, 'Could not delete user');
            }

            throw err;
        }
    }

    /**
     * Get a user's devices using their user ID.
     *
     * @param {string} userId The Passage user ID
     * @return {Promise<WebAuthnDevices[]>} List of devices
     */
    public async listDevices(userId: string): Promise<WebAuthnDevices[]> {    
        try {    
            const response = await this.userDevicesApi.listUserDevices({
                userId,
                appId: this.config.appId,
            });

            return response.devices;
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError(err, "Could not fetch user's devices:");
            }

            throw err;
        }
    }

    /**
     * Revoke a user's device using their user ID and the device ID.
     *
     * @param {string} userId The Passage user ID
     * @param {string} deviceId The Passage user's device ID
     * @return {Promise<boolean>}
     */
    public async revokeDevice(userId: string, deviceId: string): Promise<boolean> {
        try {    
            await this.userDevicesApi.deleteUserDevices({
                userId,
                deviceId,
                appId: this.config.appId,
            });

            return true;
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError(err, "Could not delete user's device:");
            }

            throw err;
        }
    }

    /**
     * Revokes all of a user's Refresh Tokens using their User ID.
     *
     * @param {string} userId The Passage user ID
     * @return {Promise<boolean>}
     */
    public async revokeRefreshTokens(userId: string): Promise<boolean> {
        try {
            const client = new TokensApi(this.config.apiConfiguration);

            await client.revokeUserRefreshTokens({
                userId,
                appId: this.config.appId,
            });
            return true;
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError(err, "Could not revoke user's refresh tokens:");
            }
            throw err;
        }
    }

    /**
     * @deprecated Use revokeRefreshTokens instead
     * Revokes all of a user's Refresh Tokens using their User ID.
     *
     * @param {string} userId The Passage user ID
     * @return {Promise<boolean>}
     */
    public async signOut(userId: string): Promise<boolean> {
        return this.revokeRefreshTokens(userId);
    }

    /**
     * @deprecated Use getByIdentifier instead
     * Get a user's object using their user identifier.
     *
     * @param {string} identifier The Passage user email or phone number
     * @return {Promise<UserInfo>} Passage User object
     */
    public async getUserByIdentifier(identifier: string): Promise<UserInfo> {
        return this.getByIdentifier(identifier);
    }
}