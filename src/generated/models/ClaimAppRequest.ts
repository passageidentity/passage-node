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
 * @interface ClaimAppRequest
 */
export interface ClaimAppRequest {
    /**
     * 
     * @type {string}
     * @memberof ClaimAppRequest
     */
    name: string;
}

/**
 * Check if a given object implements the ClaimAppRequest interface.
 */
export function instanceOfClaimAppRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function ClaimAppRequestFromJSON(json: any): ClaimAppRequest {
    return ClaimAppRequestFromJSONTyped(json, false);
}

export function ClaimAppRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ClaimAppRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
    };
}

export function ClaimAppRequestToJSON(value?: ClaimAppRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
    };
}

