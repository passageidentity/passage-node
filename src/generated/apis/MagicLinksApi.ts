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
  CreateMagicLinkRequest,
  MagicLinkResponse,
  Model400Error,
  Model401Error,
  Model403Error,
  Model404Error,
  Model500Error,
} from '../models/index';
import {
    CreateMagicLinkRequestFromJSON,
    CreateMagicLinkRequestToJSON,
    MagicLinkResponseFromJSON,
    MagicLinkResponseToJSON,
    Model400ErrorFromJSON,
    Model400ErrorToJSON,
    Model401ErrorFromJSON,
    Model401ErrorToJSON,
    Model403ErrorFromJSON,
    Model403ErrorToJSON,
    Model404ErrorFromJSON,
    Model404ErrorToJSON,
    Model500ErrorFromJSON,
    Model500ErrorToJSON,
} from '../models/index';

export interface CreateMagicLinkOperationRequest {
    appId: string;
    createMagicLinkRequest: CreateMagicLinkRequest;
}

/**
 * 
 */
export class MagicLinksApi extends runtime.BaseAPI {

    /**
     * Create magic link for a user.
     * Create Embeddable Magic Link
     */
    async createMagicLinkRaw(requestParameters: CreateMagicLinkOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MagicLinkResponse>> {
        if (requestParameters.appId === null || requestParameters.appId === undefined) {
            throw new runtime.RequiredError('appId','Required parameter requestParameters.appId was null or undefined when calling createMagicLink.');
        }

        if (requestParameters.createMagicLinkRequest === null || requestParameters.createMagicLinkRequest === undefined) {
            throw new runtime.RequiredError('createMagicLinkRequest','Required parameter requestParameters.createMagicLinkRequest was null or undefined when calling createMagicLink.');
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
            path: `/apps/{app_id}/magic-links`.replace(`{${"app_id"}}`, encodeURIComponent(String(requestParameters.appId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateMagicLinkRequestToJSON(requestParameters.createMagicLinkRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MagicLinkResponseFromJSON(jsonValue));
    }

    /**
     * Create magic link for a user.
     * Create Embeddable Magic Link
     */
    async createMagicLink(requestParameters: CreateMagicLinkOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MagicLinkResponse> {
        const response = await this.createMagicLinkRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
