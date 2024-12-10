import { PassageBase, PassageInstanceConfig } from '../PassageBase';
import { TokensApi, UserDevicesApi, UsersApi, WebAuthnDevices } from '../../generated';
import { PassageError } from '../PassageError';
import { CreateUserArgs, PassageUser, UpdateUserArgs } from './types';

/**
 * User class for handling operations to get and update user information.
 */
export class User extends PassageBase {
    private usersApi;
    private userDevicesApi;

    /**
     * User class constructor.
     * @param {PassageInstanceConfig} config config properties for Passage instance
     */
    public constructor(protected config: PassageInstanceConfig) {
        super(config);
        this.usersApi = new UsersApi(this.config.apiConfiguration);
        this.userDevicesApi = new UserDevicesApi(this.config.apiConfiguration);
    }

    /**
     * Get a user's object using their user ID.
     *
     * @param {string} userId The Passage user ID
     * @return {Promise<PassageUser>} Passage User object
     */
    public async get(userId: string): Promise<PassageUser> {
        if (!userId) {
            throw new Error('userId is required.');
        }

        try {
            const response = await this.usersApi.getUser({
                userId,
                appId: this.config.appId,
            });

            return response.user;
        } catch (err) {
            throw await this.parseError(err, 'Could not fetch user');
        }
    }

    /**
     * Get a user's object using their user identifier.
     *
     * @param {string} identifier The Passage user email or phone number
     * @return {Promise<PassageUser>} Passage User object
     */
    public async getByIdentifier(identifier: string): Promise<PassageUser> {
        if (!identifier) {
            throw new Error('identifier is required.');
        }

        try {
            const response = await this.usersApi.listPaginatedUsers({
                appId: this.config.appId,
                limit: 1,
                identifier: identifier.toLowerCase(),
            });

            const users = response.users;
            if (!users.length) {
                throw new PassageError('User not found.');
            }

            return this.get(users[0].id);
        } catch (err) {
            throw await this.parseError(err, 'Could not fetch user by identifier');
        }
    }

    /**
     * Activate a user using their user ID.
     *
     * @param {string} userId The Passage user ID
     * @return {Promise<PassageUser>} Passage User object
     */
    public async activate(userId: string): Promise<PassageUser> {
        if (!userId) {
            throw new Error('userId is required.');
        }

        try {
            const response = await this.usersApi.activateUser({
                userId,
                appId: this.config.appId,
            });
            return response.user;
        } catch (err) {
            throw await this.parseError(err, 'Could not activate user');
        }
    }

    /**
     * Deactivate a user using their user ID.
     *
     * @param {string} userId The Passage user ID
     * @return {Promise<PassageUser>} Passage User object
     */
    public async deactivate(userId: string): Promise<PassageUser> {
        if (!userId) {
            throw new Error('userId is required.');
        }

        try {
            const response = await this.usersApi.deactivateUser({
                userId,
                appId: this.config.appId,
            });

            return response.user;
        } catch (err) {
            throw await this.parseError(err, 'Could not deactivate user');
        }
    }

    /**
     * Update a user.
     *
     * @param {string} userId The Passage user ID
     * @param {UpdateUserRequest} options The user attributes to be updated
     * @return {Promise<PassageUser>} Passage User object
     */
    public async update(userId: string, options: UpdateUserArgs): Promise<PassageUser> {
        if (!userId) {
            throw new Error('userId is required.');
        }

        try {
            const response = await this.usersApi.updateUser({
                userId,
                appId: this.config.appId,
                updateUserRequest: options,
            });

            return response.user;
        } catch (err) {
            throw await this.parseError(err, 'Could not update user');
        }
    }

    /**
     * Create a user.
     *
     * @param {CreateUserArgs} args Arguments for creating a user
     * @return {Promise<PassageUser>} Passage User object
     */
    public async create(args: CreateUserArgs): Promise<PassageUser> {
        if (!args.email && !args.phone) {
            throw new Error('At least one of args.email or args.phone is required.');
        }

        try {
            const response = await this.usersApi.createUser({
                appId: this.config.appId,
                createUserRequest: args,
            });

            return response.user;
        } catch (err) {
            throw await this.parseError(err, 'Could not create user');
        }
    }

    /**
     * Delete a user using their user ID.
     *
     * @param {string} userId The Passage user ID used to delete the corresponding user.
     * @return {Promise<boolean>}
     */
    public async delete(userId: string): Promise<boolean> {
        if (!userId) {
            throw new Error('userId is required.');
        }

        try {
            await this.usersApi.deleteUser({
                userId,
                appId: this.config.appId,
            });
            return true;
        } catch (err) {
            throw await this.parseError(err, 'Could not delete user');
        }
    }

    /**
     * Get a user's devices using their user ID.
     *
     * @param {string} userId The Passage user ID
     * @return {Promise<WebAuthnDevices[]>} List of devices
     */
    public async listDevices(userId: string): Promise<WebAuthnDevices[]> {
        if (!userId) {
            throw new Error('userId is required.');
        }

        try {
            const response = await this.userDevicesApi.listUserDevices({
                userId,
                appId: this.config.appId,
            });

            return response.devices;
        } catch (err) {
            throw await this.parseError(err, "Could not fetch user's devices:");
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
        if (!userId) {
            throw new Error('userId is required.');
        }

        if (!deviceId) {
            throw new Error('deviceId is required.');
        }

        try {
            await this.userDevicesApi.deleteUserDevices({
                userId,
                deviceId,
                appId: this.config.appId,
            });

            return true;
        } catch (err) {
            throw await this.parseError(err, "Could not delete user's device:");
        }
    }

    /**
     * Revokes all of a user's Refresh Tokens using their User ID.
     *
     * @param {string} userId The Passage user ID
     * @return {Promise<boolean>}
     */
    public async revokeRefreshTokens(userId: string): Promise<boolean> {
        if (!userId) {
            throw new Error('userId is required.');
        }

        try {
            const client = new TokensApi(this.config.apiConfiguration);

            await client.revokeUserRefreshTokens({
                userId,
                appId: this.config.appId,
            });
            return true;
        } catch (err) {
            throw await this.parseError(err, "Could not revoke user's refresh tokens:");
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
     * @return {Promise<PassageUser>} Passage User object
     */
    public async getUserByIdentifier(identifier: string): Promise<PassageUser> {
        return this.getByIdentifier(identifier);
    }
}
