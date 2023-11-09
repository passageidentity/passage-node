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
 * @interface PasskeyAuthMethod
 */
export interface PasskeyAuthMethod {
    /**
     * 
     * @type {boolean}
     * @memberof PasskeyAuthMethod
     */
    enabled: boolean;
}

/**
 * Check if a given object implements the PasskeyAuthMethod interface.
 */
export function instanceOfPasskeyAuthMethod(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "enabled" in value;

    return isInstance;
}

export function PasskeyAuthMethodFromJSON(json: any): PasskeyAuthMethod {
    return PasskeyAuthMethodFromJSONTyped(json, false);
}

export function PasskeyAuthMethodFromJSONTyped(json: any, ignoreDiscriminator: boolean): PasskeyAuthMethod {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'enabled': json['enabled'],
    };
}

export function PasskeyAuthMethodToJSON(value?: PasskeyAuthMethod | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'enabled': value.enabled,
    };
}

