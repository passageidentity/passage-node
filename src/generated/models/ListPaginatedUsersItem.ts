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
import type { UserStatus } from './UserStatus';
import {
    UserStatusFromJSON,
    UserStatusFromJSONTyped,
    UserStatusToJSON,
    UserStatusToJSONTyped,
} from './UserStatus';

/**
 * 
 * @export
 * @interface ListPaginatedUsersItem
 */
export interface ListPaginatedUsersItem {
    /**
     * 
     * @type {Date}
     * @memberof ListPaginatedUsersItem
     */
    createdAt: Date;
    /**
     * 
     * @type {string}
     * @memberof ListPaginatedUsersItem
     */
    email: string;
    /**
     * 
     * @type {boolean}
     * @memberof ListPaginatedUsersItem
     */
    emailVerified: boolean;
    /**
     * The external ID of the user. Only set if the user was created in a Flex app.
     * @type {string}
     * @memberof ListPaginatedUsersItem
     */
    externalId: string;
    /**
     * 
     * @type {string}
     * @memberof ListPaginatedUsersItem
     */
    id: string;
    /**
     * 
     * @type {Date}
     * @memberof ListPaginatedUsersItem
     */
    lastLoginAt: Date;
    /**
     * 
     * @type {number}
     * @memberof ListPaginatedUsersItem
     */
    loginCount: number;
    /**
     * 
     * @type {string}
     * @memberof ListPaginatedUsersItem
     */
    phone: string;
    /**
     * 
     * @type {boolean}
     * @memberof ListPaginatedUsersItem
     */
    phoneVerified: boolean;
    /**
     * 
     * @type {UserStatus}
     * @memberof ListPaginatedUsersItem
     */
    status: UserStatus;
    /**
     * 
     * @type {Date}
     * @memberof ListPaginatedUsersItem
     */
    updatedAt: Date;
    /**
     * 
     * @type {object}
     * @memberof ListPaginatedUsersItem
     */
    userMetadata: object | null;
}



/**
 * Check if a given object implements the ListPaginatedUsersItem interface.
 */
export function instanceOfListPaginatedUsersItem(value: object): value is ListPaginatedUsersItem {
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('email' in value) || value['email'] === undefined) return false;
    if (!('emailVerified' in value) || value['emailVerified'] === undefined) return false;
    if (!('externalId' in value) || value['externalId'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('lastLoginAt' in value) || value['lastLoginAt'] === undefined) return false;
    if (!('loginCount' in value) || value['loginCount'] === undefined) return false;
    if (!('phone' in value) || value['phone'] === undefined) return false;
    if (!('phoneVerified' in value) || value['phoneVerified'] === undefined) return false;
    if (!('status' in value) || value['status'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    if (!('userMetadata' in value) || value['userMetadata'] === undefined) return false;
    return true;
}

export function ListPaginatedUsersItemFromJSON(json: any): ListPaginatedUsersItem {
    return ListPaginatedUsersItemFromJSONTyped(json, false);
}

export function ListPaginatedUsersItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListPaginatedUsersItem {
    if (json == null) {
        return json;
    }
    return {
        
        'createdAt': (new Date(json['created_at'])),
        'email': json['email'],
        'emailVerified': json['email_verified'],
        'externalId': json['external_id'],
        'id': json['id'],
        'lastLoginAt': (new Date(json['last_login_at'])),
        'loginCount': json['login_count'],
        'phone': json['phone'],
        'phoneVerified': json['phone_verified'],
        'status': UserStatusFromJSON(json['status']),
        'updatedAt': (new Date(json['updated_at'])),
        'userMetadata': json['user_metadata'],
    };
}

export function ListPaginatedUsersItemToJSON(json: any): ListPaginatedUsersItem {
    return ListPaginatedUsersItemToJSONTyped(json, false);
}

export function ListPaginatedUsersItemToJSONTyped(value?: ListPaginatedUsersItem | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'created_at': ((value['createdAt']).toISOString()),
        'email': value['email'],
        'email_verified': value['emailVerified'],
        'external_id': value['externalId'],
        'id': value['id'],
        'last_login_at': ((value['lastLoginAt']).toISOString()),
        'login_count': value['loginCount'],
        'phone': value['phone'],
        'phone_verified': value['phoneVerified'],
        'status': UserStatusToJSON(value['status']),
        'updated_at': ((value['updatedAt']).toISOString()),
        'user_metadata': value['userMetadata'],
    };
}

