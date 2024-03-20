/* tslint:disable */
/* eslint-disable */
/**
 * Passage Management API
 * Passage\'s management API to manage your Passage apps and users.
 *
 * The version of the OpenAPI document: 1
 * Contact: support@passage.id
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  CreateUserRequest,
  ListPaginatedUsersResponse,
  Model400Error,
  Model401Error,
  Model404Error,
  Model500Error,
  UpdateUserRequest,
  UserResponse,
} from '../models/index';
import {
    CreateUserRequestFromJSON,
    CreateUserRequestToJSON,
    ListPaginatedUsersResponseFromJSON,
    ListPaginatedUsersResponseToJSON,
    Model400ErrorFromJSON,
    Model400ErrorToJSON,
    Model401ErrorFromJSON,
    Model401ErrorToJSON,
    Model404ErrorFromJSON,
    Model404ErrorToJSON,
    Model500ErrorFromJSON,
    Model500ErrorToJSON,
    UpdateUserRequestFromJSON,
    UpdateUserRequestToJSON,
    UserResponseFromJSON,
    UserResponseToJSON,
} from '../models/index';

export interface ActivateUserRequest {
    appId: string;
    userId: string;
}

export interface CreateUserOperationRequest {
    appId: string;
    createUserRequest: CreateUserRequest;
}

export interface DeactivateUserRequest {
    appId: string;
    userId: string;
}

export interface DeleteUserRequest {
    appId: string;
    userId: string;
}

export interface GetUserRequest {
    appId: string;
    userId: string;
}

export interface ListPaginatedUsersRequest {
    appId: string;
    page?: number;
    limit?: number;
    createdBefore?: number;
    orderBy?: string;
    identifier?: string;
    id?: string;
    loginCount?: number;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    lastLoginAt?: string;
}

export interface UpdateUserOperationRequest {
    appId: string;
    userId: string;
    updateUserRequest: UpdateUserRequest;
}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     * Activate a user. They will now be able to login.
     * Activate User
     */
    async activateUserRaw(requestParameters: ActivateUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserResponse>> {
        if (requestParameters.appId === null || requestParameters.appId === undefined) {
            throw new runtime.RequiredError('appId','Required parameter requestParameters.appId was null or undefined when calling activateUser.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling activateUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/apps/{app_id}/users/{user_id}/activate`.replace(`{${"app_id"}}`, encodeURIComponent(String(requestParameters.appId))).replace(`{${"user_id"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserResponseFromJSON(jsonValue));
    }

    /**
     * Activate a user. They will now be able to login.
     * Activate User
     */
    async activateUser(requestParameters: ActivateUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserResponse> {
        const response = await this.activateUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create user for an application. Must provide an email of phone number identifier.
     * Create User
     */
    async createUserRaw(requestParameters: CreateUserOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserResponse>> {
        if (requestParameters.appId === null || requestParameters.appId === undefined) {
            throw new runtime.RequiredError('appId','Required parameter requestParameters.appId was null or undefined when calling createUser.');
        }

        if (requestParameters.createUserRequest === null || requestParameters.createUserRequest === undefined) {
            throw new runtime.RequiredError('createUserRequest','Required parameter requestParameters.createUserRequest was null or undefined when calling createUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/apps/{app_id}/users`.replace(`{${"app_id"}}`, encodeURIComponent(String(requestParameters.appId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateUserRequestToJSON(requestParameters.createUserRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserResponseFromJSON(jsonValue));
    }

    /**
     * Create user for an application. Must provide an email of phone number identifier.
     * Create User
     */
    async createUser(requestParameters: CreateUserOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserResponse> {
        const response = await this.createUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Deactivate a user. Their account will still exist, but they will not be able to login.
     * Deactivate User
     */
    async deactivateUserRaw(requestParameters: DeactivateUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserResponse>> {
        if (requestParameters.appId === null || requestParameters.appId === undefined) {
            throw new runtime.RequiredError('appId','Required parameter requestParameters.appId was null or undefined when calling deactivateUser.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling deactivateUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/apps/{app_id}/users/{user_id}/deactivate`.replace(`{${"app_id"}}`, encodeURIComponent(String(requestParameters.appId))).replace(`{${"user_id"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserResponseFromJSON(jsonValue));
    }

    /**
     * Deactivate a user. Their account will still exist, but they will not be able to login.
     * Deactivate User
     */
    async deactivateUser(requestParameters: DeactivateUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserResponse> {
        const response = await this.deactivateUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete a user.
     * Delete User
     */
    async deleteUserRaw(requestParameters: DeleteUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.appId === null || requestParameters.appId === undefined) {
            throw new runtime.RequiredError('appId','Required parameter requestParameters.appId was null or undefined when calling deleteUser.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling deleteUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/apps/{app_id}/users/{user_id}`.replace(`{${"app_id"}}`, encodeURIComponent(String(requestParameters.appId))).replace(`{${"user_id"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete a user.
     * Delete User
     */
    async deleteUser(requestParameters: DeleteUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteUserRaw(requestParameters, initOverrides);
    }

    /**
     * Get information about a user.
     * Get User
     */
    async getUserRaw(requestParameters: GetUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserResponse>> {
        if (requestParameters.appId === null || requestParameters.appId === undefined) {
            throw new runtime.RequiredError('appId','Required parameter requestParameters.appId was null or undefined when calling getUser.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling getUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/apps/{app_id}/users/{user_id}`.replace(`{${"app_id"}}`, encodeURIComponent(String(requestParameters.appId))).replace(`{${"user_id"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserResponseFromJSON(jsonValue));
    }

    /**
     * Get information about a user.
     * Get User
     */
    async getUser(requestParameters: GetUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserResponse> {
        const response = await this.getUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List users for an app.
     * List Users
     */
    async listPaginatedUsersRaw(requestParameters: ListPaginatedUsersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListPaginatedUsersResponse>> {
        if (requestParameters.appId === null || requestParameters.appId === undefined) {
            throw new runtime.RequiredError('appId','Required parameter requestParameters.appId was null or undefined when calling listPaginatedUsers.');
        }

        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.createdBefore !== undefined) {
            queryParameters['created_before'] = requestParameters.createdBefore;
        }

        if (requestParameters.orderBy !== undefined) {
            queryParameters['order_by'] = requestParameters.orderBy;
        }

        if (requestParameters.identifier !== undefined) {
            queryParameters['identifier'] = requestParameters.identifier;
        }

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        if (requestParameters.loginCount !== undefined) {
            queryParameters['login_count'] = requestParameters.loginCount;
        }

        if (requestParameters.status !== undefined) {
            queryParameters['status'] = requestParameters.status;
        }

        if (requestParameters.createdAt !== undefined) {
            queryParameters['created_at'] = requestParameters.createdAt;
        }

        if (requestParameters.updatedAt !== undefined) {
            queryParameters['updated_at'] = requestParameters.updatedAt;
        }

        if (requestParameters.lastLoginAt !== undefined) {
            queryParameters['last_login_at'] = requestParameters.lastLoginAt;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/apps/{app_id}/users`.replace(`{${"app_id"}}`, encodeURIComponent(String(requestParameters.appId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ListPaginatedUsersResponseFromJSON(jsonValue));
    }

    /**
     * List users for an app.
     * List Users
     */
    async listPaginatedUsers(requestParameters: ListPaginatedUsersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListPaginatedUsersResponse> {
        const response = await this.listPaginatedUsersRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update a user\'s information.
     * Update User
     */
    async updateUserRaw(requestParameters: UpdateUserOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserResponse>> {
        if (requestParameters.appId === null || requestParameters.appId === undefined) {
            throw new runtime.RequiredError('appId','Required parameter requestParameters.appId was null or undefined when calling updateUser.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling updateUser.');
        }

        if (requestParameters.updateUserRequest === null || requestParameters.updateUserRequest === undefined) {
            throw new runtime.RequiredError('updateUserRequest','Required parameter requestParameters.updateUserRequest was null or undefined when calling updateUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/apps/{app_id}/users/{user_id}`.replace(`{${"app_id"}}`, encodeURIComponent(String(requestParameters.appId))).replace(`{${"user_id"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateUserRequestToJSON(requestParameters.updateUserRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserResponseFromJSON(jsonValue));
    }

    /**
     * Update a user\'s information.
     * Update User
     */
    async updateUser(requestParameters: UpdateUserOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserResponse> {
        const response = await this.updateUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
