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
import type { UserEventInfo } from './UserEventInfo';
import {
    UserEventInfoFromJSON,
    UserEventInfoFromJSONTyped,
    UserEventInfoToJSON,
} from './UserEventInfo';
import type { WebAuthnDevices } from './WebAuthnDevices';
import {
    WebAuthnDevicesFromJSON,
    WebAuthnDevicesFromJSONTyped,
    WebAuthnDevicesToJSON,
} from './WebAuthnDevices';

/**
 * 
 * @export
 * @interface UserInfo
 */
export interface UserInfo {
    /**
     * 
     * @type {Date}
     * @memberof UserInfo
     */
    createdAt: Date;
    /**
     * 
     * @type {string}
     * @memberof UserInfo
     */
    email: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserInfo
     */
    emailVerified: boolean;
    /**
     * 
     * @type {string}
     * @memberof UserInfo
     */
    id: string;
    /**
     * 
     * @type {Date}
     * @memberof UserInfo
     */
    lastLoginAt: Date;
    /**
     * 
     * @type {number}
     * @memberof UserInfo
     */
    loginCount: number;
    /**
     * 
     * @type {string}
     * @memberof UserInfo
     */
    phone: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserInfo
     */
    phoneVerified: boolean;
    /**
     * 
     * @type {Array<UserEventInfo>}
     * @memberof UserInfo
     */
    recentEvents: Array<UserEventInfo>;
    /**
     * 
     * @type {string}
     * @memberof UserInfo
     */
    status: string;
    /**
     * 
     * @type {Date}
     * @memberof UserInfo
     */
    updatedAt: Date;
    /**
     * 
     * @type {object}
     * @memberof UserInfo
     */
    userMetadata: object | null;
    /**
     * 
     * @type {boolean}
     * @memberof UserInfo
     */
    webauthn: boolean;
    /**
     * 
     * @type {Array<WebAuthnDevices>}
     * @memberof UserInfo
     */
    webauthnDevices: Array<WebAuthnDevices>;
}

/**
 * Check if a given object implements the UserInfo interface.
 */
export function instanceOfUserInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "emailVerified" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "lastLoginAt" in value;
    isInstance = isInstance && "loginCount" in value;
    isInstance = isInstance && "phone" in value;
    isInstance = isInstance && "phoneVerified" in value;
    isInstance = isInstance && "recentEvents" in value;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "userMetadata" in value;
    isInstance = isInstance && "webauthn" in value;
    isInstance = isInstance && "webauthnDevices" in value;

    return isInstance;
}

export function UserInfoFromJSON(json: any): UserInfo {
    return UserInfoFromJSONTyped(json, false);
}

export function UserInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'createdAt': (new Date(json['created_at'])),
        'email': json['email'],
        'emailVerified': json['email_verified'],
        'id': json['id'],
        'lastLoginAt': (new Date(json['last_login_at'])),
        'loginCount': json['login_count'],
        'phone': json['phone'],
        'phoneVerified': json['phone_verified'],
        'recentEvents': ((json['recent_events'] as Array<any>)?.map(UserEventInfoFromJSON)),
        'status': json['status'],
        'updatedAt': (new Date(json['updated_at'])),
        'userMetadata': json['user_metadata'],
        'webauthn': json['webauthn'],
        'webauthnDevices': ((json['webauthn_devices'] as Array<any>)?.map(WebAuthnDevicesFromJSON)),
    };
}

export function UserInfoToJSON(value?: UserInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'created_at': (value.createdAt.toISOString()),
        'email': value.email,
        'email_verified': value.emailVerified,
        'id': value.id,
        'last_login_at': (value.lastLoginAt.toISOString()),
        'login_count': value.loginCount,
        'phone': value.phone,
        'phone_verified': value.phoneVerified,
        'recent_events': ((value.recentEvents as Array<any>)?.map(UserEventInfoToJSON)),
        'status': value.status,
        'updated_at': (value.updatedAt.toISOString()),
        'user_metadata': value.userMetadata,
        'webauthn': value.webauthn,
        'webauthn_devices': ((value.webauthnDevices as Array<any>)?.map(WebAuthnDevicesToJSON)),
    };
}

