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
 * @interface UpdateUserMetadataField
 */
export interface UpdateUserMetadataField {
    /**
     * 
     * @type {string}
     * @memberof UpdateUserMetadataField
     */
    friendlyName?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateUserMetadataField
     */
    profile?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateUserMetadataField
     */
    registration?: boolean;
}

/**
 * Check if a given object implements the UpdateUserMetadataField interface.
 */
export function instanceOfUpdateUserMetadataField(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdateUserMetadataFieldFromJSON(json: any): UpdateUserMetadataField {
    return UpdateUserMetadataFieldFromJSONTyped(json, false);
}

export function UpdateUserMetadataFieldFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateUserMetadataField {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'friendlyName': !exists(json, 'friendly_name') ? undefined : json['friendly_name'],
        'profile': !exists(json, 'profile') ? undefined : json['profile'],
        'registration': !exists(json, 'registration') ? undefined : json['registration'],
    };
}

export function UpdateUserMetadataFieldToJSON(value?: UpdateUserMetadataField | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'friendly_name': value.friendlyName,
        'profile': value.profile,
        'registration': value.registration,
    };
}

