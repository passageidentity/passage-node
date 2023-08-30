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

import { exists, mapValues } from '../runtime';
import type { CreatedApiKey } from './CreatedApiKey';
import {
    CreatedApiKeyFromJSON,
    CreatedApiKeyFromJSONTyped,
    CreatedApiKeyToJSON,
} from './CreatedApiKey';

/**
 * 
 * @export
 * @interface CreateApiKeyResponse
 */
export interface CreateApiKeyResponse {
    /**
     * 
     * @type {CreatedApiKey}
     * @memberof CreateApiKeyResponse
     */
    apiKey: CreatedApiKey;
}

/**
 * Check if a given object implements the CreateApiKeyResponse interface.
 */
export function instanceOfCreateApiKeyResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "apiKey" in value;

    return isInstance;
}

export function CreateApiKeyResponseFromJSON(json: any): CreateApiKeyResponse {
    return CreateApiKeyResponseFromJSONTyped(json, false);
}

export function CreateApiKeyResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateApiKeyResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiKey': CreatedApiKeyFromJSON(json['api_key']),
    };
}

export function CreateApiKeyResponseToJSON(value?: CreateApiKeyResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'api_key': CreatedApiKeyToJSON(value.apiKey),
    };
}

