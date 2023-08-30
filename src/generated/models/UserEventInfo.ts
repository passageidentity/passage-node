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
 * @interface UserEventInfo
 */
export interface UserEventInfo {
    /**
     * 
     * @type {Date}
     * @memberof UserEventInfo
     */
    createdAt: Date;
    /**
     * 
     * @type {string}
     * @memberof UserEventInfo
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof UserEventInfo
     */
    ipAddr: string;
    /**
     * 
     * @type {string}
     * @memberof UserEventInfo
     */
    type: string;
    /**
     * 
     * @type {string}
     * @memberof UserEventInfo
     */
    userAgent: string;
}

/**
 * Check if a given object implements the UserEventInfo interface.
 */
export function instanceOfUserEventInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "ipAddr" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "userAgent" in value;

    return isInstance;
}

export function UserEventInfoFromJSON(json: any): UserEventInfo {
    return UserEventInfoFromJSONTyped(json, false);
}

export function UserEventInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserEventInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'createdAt': (new Date(json['created_at'])),
        'id': json['id'],
        'ipAddr': json['ip_addr'],
        'type': json['type'],
        'userAgent': json['user_agent'],
    };
}

export function UserEventInfoToJSON(value?: UserEventInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'created_at': (value.createdAt.toISOString()),
        'id': value.id,
        'ip_addr': value.ipAddr,
        'type': value.type,
        'user_agent': value.userAgent,
    };
}
