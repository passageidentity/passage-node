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

import { mapValues } from '../runtime';
import type { UserMetadataFieldType } from './UserMetadataFieldType';
import {
    UserMetadataFieldTypeFromJSON,
    UserMetadataFieldTypeFromJSONTyped,
    UserMetadataFieldTypeToJSON,
    UserMetadataFieldTypeToJSONTyped,
} from './UserMetadataFieldType';

/**
 * 
 * @export
 * @interface UserMetadataField
 */
export interface UserMetadataField {
    /**
     * 
     * @type {string}
     * @memberof UserMetadataField
     */
    field_name: string;
    /**
     * 
     * @type {string}
     * @memberof UserMetadataField
     */
    friendly_name: string;
    /**
     * 
     * @type {string}
     * @memberof UserMetadataField
     */
    id: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserMetadataField
     */
    profile: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UserMetadataField
     */
    registration: boolean;
    /**
     * 
     * @type {UserMetadataFieldType}
     * @memberof UserMetadataField
     */
    type: UserMetadataFieldType;
}



/**
 * Check if a given object implements the UserMetadataField interface.
 */
export function instanceOfUserMetadataField(value: object): value is UserMetadataField {
    if (!('field_name' in value) || value['field_name'] === undefined) return false;
    if (!('friendly_name' in value) || value['friendly_name'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('profile' in value) || value['profile'] === undefined) return false;
    if (!('registration' in value) || value['registration'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    return true;
}

export function UserMetadataFieldFromJSON(json: any): UserMetadataField {
    return UserMetadataFieldFromJSONTyped(json, false);
}

export function UserMetadataFieldFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserMetadataField {
    if (json == null) {
        return json;
    }
    return {
        
        'field_name': json['field_name'],
        'friendly_name': json['friendly_name'],
        'id': json['id'],
        'profile': json['profile'],
        'registration': json['registration'],
        'type': UserMetadataFieldTypeFromJSON(json['type']),
    };
}

export function UserMetadataFieldToJSON(json: any): UserMetadataField {
    return UserMetadataFieldToJSONTyped(json, false);
}

export function UserMetadataFieldToJSONTyped(value?: UserMetadataField | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'field_name': value['field_name'],
        'friendly_name': value['friendly_name'],
        'id': value['id'],
        'profile': value['profile'],
        'registration': value['registration'],
        'type': UserMetadataFieldTypeToJSON(value['type']),
    };
}

