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
/**
 * 
 * @export
 * @interface UpdateFunctionSecretRequest
 */
export interface UpdateFunctionSecretRequest {
    /**
     * 
     * @type {string}
     * @memberof UpdateFunctionSecretRequest
     */
    key?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateFunctionSecretRequest
     */
    value?: string;
}

/**
 * Check if a given object implements the UpdateFunctionSecretRequest interface.
 */
export function instanceOfUpdateFunctionSecretRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdateFunctionSecretRequestFromJSON(json: any): UpdateFunctionSecretRequest {
    return UpdateFunctionSecretRequestFromJSONTyped(json, false);
}

export function UpdateFunctionSecretRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateFunctionSecretRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'key': !exists(json, 'key') ? undefined : json['key'],
        'value': !exists(json, 'value') ? undefined : json['value'],
    };
}

export function UpdateFunctionSecretRequestToJSON(value?: UpdateFunctionSecretRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'key': value.key,
        'value': value.value,
    };
}
