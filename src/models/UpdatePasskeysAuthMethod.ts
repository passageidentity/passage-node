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

import { exists, mapValues } from '../generated/runtime';
/**
 *
 * @export
 * @interface UpdatePasskeysAuthMethod
 * @deprecated this interface will be removed in version 3.0
 */
export interface UpdatePasskeysAuthMethod {
    /**
     *
     * @type {boolean}
     * @memberof UpdatePasskeysAuthMethod
     */
    enabled?: boolean;
}

/**
 * Check if a given object implements the UpdatePasskeysAuthMethod interface.
 */
export function instanceOfUpdatePasskeysAuthMethod(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdatePasskeysAuthMethodFromJSON(json: any): UpdatePasskeysAuthMethod {
    return UpdatePasskeysAuthMethodFromJSONTyped(json, false);
}

export function UpdatePasskeysAuthMethodFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean,
): UpdatePasskeysAuthMethod {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        enabled: !exists(json, 'enabled') ? undefined : json['enabled'],
    };
}

export function UpdatePasskeysAuthMethodToJSON(value?: UpdatePasskeysAuthMethod | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        enabled: value.enabled,
    };
}
