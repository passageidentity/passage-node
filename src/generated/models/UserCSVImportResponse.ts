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
import type { UserCSVImportError } from './UserCSVImportError';
import {
    UserCSVImportErrorFromJSON,
    UserCSVImportErrorFromJSONTyped,
    UserCSVImportErrorToJSON,
} from './UserCSVImportError';

/**
 * 
 * @export
 * @interface UserCSVImportResponse
 */
export interface UserCSVImportResponse {
    /**
     * 
     * @type {Array<UserCSVImportError>}
     * @memberof UserCSVImportResponse
     */
    errors: Array<UserCSVImportError>;
    /**
     * 
     * @type {Array<{ [key: string]: string; }>}
     * @memberof UserCSVImportResponse
     */
    existing: Array<{ [key: string]: string; }>;
    /**
     * 
     * @type {Array<{ [key: string]: string; }>}
     * @memberof UserCSVImportResponse
     */
    imported: Array<{ [key: string]: string; }>;
    /**
     * 
     * @type {number}
     * @memberof UserCSVImportResponse
     */
    numUsersErrored: number;
    /**
     * 
     * @type {number}
     * @memberof UserCSVImportResponse
     */
    numUsersExisting: number;
    /**
     * 
     * @type {number}
     * @memberof UserCSVImportResponse
     */
    numUsersImported: number;
    /**
     * 
     * @type {number}
     * @memberof UserCSVImportResponse
     */
    numUsersReceived: number;
}

/**
 * Check if a given object implements the UserCSVImportResponse interface.
 */
export function instanceOfUserCSVImportResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "errors" in value;
    isInstance = isInstance && "existing" in value;
    isInstance = isInstance && "imported" in value;
    isInstance = isInstance && "numUsersErrored" in value;
    isInstance = isInstance && "numUsersExisting" in value;
    isInstance = isInstance && "numUsersImported" in value;
    isInstance = isInstance && "numUsersReceived" in value;

    return isInstance;
}

export function UserCSVImportResponseFromJSON(json: any): UserCSVImportResponse {
    return UserCSVImportResponseFromJSONTyped(json, false);
}

export function UserCSVImportResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserCSVImportResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'errors': ((json['errors'] as Array<any>).map(UserCSVImportErrorFromJSON)),
        'existing': json['existing'],
        'imported': json['imported'],
        'numUsersErrored': json['num_users_errored'],
        'numUsersExisting': json['num_users_existing'],
        'numUsersImported': json['num_users_imported'],
        'numUsersReceived': json['num_users_received'],
    };
}

export function UserCSVImportResponseToJSON(value?: UserCSVImportResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'errors': ((value.errors as Array<any>).map(UserCSVImportErrorToJSON)),
        'existing': value.existing,
        'imported': value.imported,
        'num_users_errored': value.numUsersErrored,
        'num_users_existing': value.numUsersExisting,
        'num_users_imported': value.numUsersImported,
        'num_users_received': value.numUsersReceived,
    };
}
