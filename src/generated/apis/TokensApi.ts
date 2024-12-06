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
  Model401Error,
  Model403Error,
  Model404Error,
  Model500Error,
} from '../models/index';
import {
    Model401ErrorFromJSON,
    Model401ErrorToJSON,
    Model403ErrorFromJSON,
    Model403ErrorToJSON,
    Model404ErrorFromJSON,
    Model404ErrorToJSON,
    Model500ErrorFromJSON,
    Model500ErrorToJSON,
} from '../models/index';

export interface RevokeUserRefreshTokensRequest {
    appId: string;
    userId: string;
}

/**
 * 
 */
export class TokensApi extends runtime.BaseAPI {

    /**
     * Revokes all refresh tokens for a user
     * Revokes refresh tokens
     */
    async revokeUserRefreshTokensRaw(requestParameters: RevokeUserRefreshTokensRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['appId'] == null) {
            throw new runtime.RequiredError(
                'appId',
                'Required parameter "appId" was null or undefined when calling revokeUserRefreshTokens().'
            );
        }

        if (requestParameters['userId'] == null) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter "userId" was null or undefined when calling revokeUserRefreshTokens().'
            );
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
            path: `/apps/{app_id}/users/{user_id}/tokens`.replace(`{${"app_id"}}`, encodeURIComponent(String(requestParameters['appId']))).replace(`{${"user_id"}}`, encodeURIComponent(String(requestParameters['userId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Revokes all refresh tokens for a user
     * Revokes refresh tokens
     */
    async revokeUserRefreshTokens(requestParameters: RevokeUserRefreshTokensRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.revokeUserRefreshTokensRaw(requestParameters, initOverrides);
    }

}
