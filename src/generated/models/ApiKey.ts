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
 * @interface ApiKey
 */
export interface ApiKey {
    /**
     * 
     * @type {string}
     * @memberof ApiKey
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof ApiKey
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof ApiKey
     */
    key_prefix: string;
    /**
     * 
     * @type {string}
     * @memberof ApiKey
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof ApiKey
     */
    role: string;
}

/**
 * Check if a given object implements the ApiKey interface.
 */
export function instanceOfApiKey(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "created_at" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "key_prefix" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "role" in value;

    return isInstance;
}

export function ApiKeyFromJSON(json: any): ApiKey {
    return ApiKeyFromJSONTyped(json, false);
}

export function ApiKeyFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiKey {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'created_at': json['created_at'],
        'id': json['id'],
        'key_prefix': json['key_prefix'],
        'name': json['name'],
        'role': json['role'],
    };
}

export function ApiKeyToJSON(value?: ApiKey | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'created_at': value.created_at,
        'id': value.id,
        'key_prefix': value.key_prefix,
        'name': value.name,
        'role': value.role,
    };
}

