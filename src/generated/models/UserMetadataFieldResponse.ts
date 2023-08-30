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
import type { UserMetadataField } from './UserMetadataField';
import {
    UserMetadataFieldFromJSON,
    UserMetadataFieldFromJSONTyped,
    UserMetadataFieldToJSON,
} from './UserMetadataField';

/**
 * 
 * @export
 * @interface UserMetadataFieldResponse
 */
export interface UserMetadataFieldResponse {
    /**
     * 
     * @type {UserMetadataField}
     * @memberof UserMetadataFieldResponse
     */
    userMetadataField: UserMetadataField;
}

/**
 * Check if a given object implements the UserMetadataFieldResponse interface.
 */
export function instanceOfUserMetadataFieldResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "userMetadataField" in value;

    return isInstance;
}

export function UserMetadataFieldResponseFromJSON(json: any): UserMetadataFieldResponse {
    return UserMetadataFieldResponseFromJSONTyped(json, false);
}

export function UserMetadataFieldResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserMetadataFieldResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'userMetadataField': UserMetadataFieldFromJSON(json['user_metadata_field']),
    };
}

export function UserMetadataFieldResponseToJSON(value?: UserMetadataFieldResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'user_metadata_field': UserMetadataFieldToJSON(value.userMetadataField),
    };
}
