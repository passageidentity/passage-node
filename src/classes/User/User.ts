import { PassageBase, PassageInstanceConfig } from '../PassageBase';
import {
    CreateUserArgs,
    PassageUser,
    ResponseError,
    TokensApi,
    UpdateUserArgs,
    UserDevicesApi,
    UsersApi,
    WebAuthnDevices,
} from '../../generated';

/**
 * User class for handling operations to get and update user information.
 */
export class User extends PassageBase {
    private readonly usersApi: UsersApi;
    private readonly userDevicesApi: UserDevicesApi;
    private readonly tokensApi: TokensApi;

    /**
     * User class constructor.
     * @param {PassageInstanceConfig} config config properties for Passage instance
     */
    public constructor(config: PassageInstanceConfig) {
        super(config);
        this.usersApi = new UsersApi(this.config.apiConfiguration);
        this.userDevicesApi = new UserDevicesApi(this.config.apiConfiguration);
        this.tokensApi = new TokensApi(this.config.apiConfiguration);
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
            throw await this.parseError(err);
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
                throw new ResponseError(
                    new Response('{"code":"user_not_found","error":"User not found."}', { status: 404 }),
                );
            }

            return this.get(users[0].id);
        } catch (err) {
            throw await this.parseError(err);
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
            throw await this.parseError(err);
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
            throw await this.parseError(err);
        }
    }

    /**
     * Update a user.
     *
     * @param {string} userId The Passage user ID
     * @param {UpdateUserArgs} options The user attributes to be updated
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
                updateUserArgs: options,
            });

            return response.user;
        } catch (err) {
            throw await this.parseError(err);
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
                createUserArgs: args,
            });

            return response.user;
        } catch (err) {
            throw await this.parseError(err);
        }
    }

    /**
     * Delete a user using their user ID.
     *
     * @param {string} userId The Passage user ID used to delete the corresponding user.
     * @return {Promise<void>}
     */
    public async delete(userId: string): Promise<void> {
        if (!userId) {
            throw new Error('userId is required.');
        }

        try {
            await this.usersApi.deleteUser({
                userId,
                appId: this.config.appId,
            });
        } catch (err) {
            throw await this.parseError(err);
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
            throw await this.parseError(err);
        }
    }

    /**
     * Revoke a user's device using their user ID and the device ID.
     *
     * @param {string} userId The Passage user ID
     * @param {string} deviceId The Passage user's device ID
     * @return {Promise<void>}
     */
    public async revokeDevice(userId: string, deviceId: string): Promise<void> {
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
        } catch (err) {
            throw await this.parseError(err);
        }
    }

    /**
     * Revokes all of a user's Refresh Tokens using their User ID.
     *
     * @param {string} userId The Passage user ID
     * @return {Promise<void>}
     */
    public async revokeRefreshTokens(userId: string): Promise<void> {
        if (!userId) {
            throw new Error('userId is required.');
        }

        try {
            await this.tokensApi.revokeUserRefreshTokens({
                userId,
                appId: this.config.appId,
            });
        } catch (err) {
            throw await this.parseError(err);
        }
    }
}
