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
 * @interface CreatedApiKey
 */
export interface CreatedApiKey {
    /**
     * 
     * @type {string}
     * @memberof CreatedApiKey
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof CreatedApiKey
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof CreatedApiKey
     */
    key_prefix: string;
    /**
     * 
     * @type {string}
     * @memberof CreatedApiKey
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof CreatedApiKey
     */
    role: string;
    /**
     * 
     * @type {string}
     * @memberof CreatedApiKey
     */
    plaintext_key: string;
}

/**
 * Check if a given object implements the CreatedApiKey interface.
 */
export function instanceOfCreatedApiKey(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "created_at" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "key_prefix" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "role" in value;
    isInstance = isInstance && "plaintext_key" in value;

    return isInstance;
}

export function CreatedApiKeyFromJSON(json: any): CreatedApiKey {
    return CreatedApiKeyFromJSONTyped(json, false);
}

export function CreatedApiKeyFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreatedApiKey {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'created_at': json['created_at'],
        'id': json['id'],
        'key_prefix': json['key_prefix'],
        'name': json['name'],
        'role': json['role'],
        'plaintext_key': json['plaintext_key'],
    };
}

export function CreatedApiKeyToJSON(value?: CreatedApiKey | null): any {
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
        'plaintext_key': value.plaintext_key,
    };
}

