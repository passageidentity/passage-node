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
  ListDevicesResponse,
  Model401Error,
  Model404Error,
  Model500Error,
} from '../models/index';
import {
    ListDevicesResponseFromJSON,
    ListDevicesResponseToJSON,
    Model401ErrorFromJSON,
    Model401ErrorToJSON,
    Model404ErrorFromJSON,
    Model404ErrorToJSON,
    Model500ErrorFromJSON,
    Model500ErrorToJSON,
} from '../models/index';

export interface DeleteUserDevicesRequest {
    appId: string;
    userId: string;
    deviceId: string;
}

export interface ListUserDevicesRequest {
    appId: string;
    userId: string;
}

/**
 * 
 */
export class UserDevicesApi extends runtime.BaseAPI {

    /**
     * Delete a device for a user.
     * Delete a device for a user
     */
    async deleteUserDevicesRaw(requestParameters: DeleteUserDevicesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.appId === null || requestParameters.appId === undefined) {
            throw new runtime.RequiredError('appId','Required parameter requestParameters.appId was null or undefined when calling deleteUserDevices.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling deleteUserDevices.');
        }

        if (requestParameters.deviceId === null || requestParameters.deviceId === undefined) {
            throw new runtime.RequiredError('deviceId','Required parameter requestParameters.deviceId was null or undefined when calling deleteUserDevices.');
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
            path: `/apps/{app_id}/users/{user_id}/devices/{device_id}`.replace(`{${"app_id"}}`, encodeURIComponent(String(requestParameters.appId))).replace(`{${"user_id"}}`, encodeURIComponent(String(requestParameters.userId))).replace(`{${"device_id"}}`, encodeURIComponent(String(requestParameters.deviceId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete a device for a user.
     * Delete a device for a user
     */
    async deleteUserDevices(requestParameters: DeleteUserDevicesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteUserDevicesRaw(requestParameters, initOverrides);
    }

    /**
     * List user devices.
     * List User Devices
     */
    async listUserDevicesRaw(requestParameters: ListUserDevicesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListDevicesResponse>> {
        if (requestParameters.appId === null || requestParameters.appId === undefined) {
            throw new runtime.RequiredError('appId','Required parameter requestParameters.appId was null or undefined when calling listUserDevices.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling listUserDevices.');
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
            path: `/apps/{app_id}/users/{user_id}/devices`.replace(`{${"app_id"}}`, encodeURIComponent(String(requestParameters.appId))).replace(`{${"user_id"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ListDevicesResponseFromJSON(jsonValue));
    }

    /**
     * List user devices.
     * List User Devices
     */
    async listUserDevices(requestParameters: ListUserDevicesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListDevicesResponse> {
        const response = await this.listUserDevicesRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
