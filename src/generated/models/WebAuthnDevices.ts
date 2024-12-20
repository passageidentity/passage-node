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
import type { WebAuthnIcons } from './WebAuthnIcons';
import {
    WebAuthnIconsFromJSON,
    WebAuthnIconsFromJSONTyped,
    WebAuthnIconsToJSON,
    WebAuthnIconsToJSONTyped,
} from './WebAuthnIcons';
import type { WebAuthnType } from './WebAuthnType';
import {
    WebAuthnTypeFromJSON,
    WebAuthnTypeFromJSONTyped,
    WebAuthnTypeToJSON,
    WebAuthnTypeToJSONTyped,
} from './WebAuthnType';

/**
 * 
 * @export
 * @interface WebAuthnDevices
 */
export interface WebAuthnDevices {
    /**
     * The first time this webAuthn device was used to authenticate the user
     * @type {Date}
     * @memberof WebAuthnDevices
     */
    created_at: Date;
    /**
     * The CredID for this webAuthn device
     * @type {string}
     * @memberof WebAuthnDevices
     */
    cred_id: string;
    /**
     * The friendly name for the webAuthn device used to authenticate
     * @type {string}
     * @memberof WebAuthnDevices
     */
    friendly_name: string;
    /**
     * The ID of the webAuthn device used for authentication
     * @type {string}
     * @memberof WebAuthnDevices
     */
    id: string;
    /**
     * The last time this webAuthn device was used to authenticate the user
     * @type {Date}
     * @memberof WebAuthnDevices
     */
    last_login_at: Date;
    /**
     * 
     * @type {WebAuthnType}
     * @memberof WebAuthnDevices
     */
    type: WebAuthnType;
    /**
     * The last time this webAuthn device was updated
     * @type {Date}
     * @memberof WebAuthnDevices
     */
    updated_at: Date;
    /**
     * How many times this webAuthn device has been used to authenticate the user
     * @type {number}
     * @memberof WebAuthnDevices
     */
    usage_count: number;
    /**
     * 
     * @type {WebAuthnIcons}
     * @memberof WebAuthnDevices
     */
    icons: WebAuthnIcons;
}



/**
 * Check if a given object implements the WebAuthnDevices interface.
 */
export function instanceOfWebAuthnDevices(value: object): value is WebAuthnDevices {
    if (!('created_at' in value) || value['created_at'] === undefined) return false;
    if (!('cred_id' in value) || value['cred_id'] === undefined) return false;
    if (!('friendly_name' in value) || value['friendly_name'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('last_login_at' in value) || value['last_login_at'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('updated_at' in value) || value['updated_at'] === undefined) return false;
    if (!('usage_count' in value) || value['usage_count'] === undefined) return false;
    if (!('icons' in value) || value['icons'] === undefined) return false;
    return true;
}

export function WebAuthnDevicesFromJSON(json: any): WebAuthnDevices {
    return WebAuthnDevicesFromJSONTyped(json, false);
}

export function WebAuthnDevicesFromJSONTyped(json: any, ignoreDiscriminator: boolean): WebAuthnDevices {
    if (json == null) {
        return json;
    }
    return {
        
        'created_at': (new Date(json['created_at'])),
        'cred_id': json['cred_id'],
        'friendly_name': json['friendly_name'],
        'id': json['id'],
        'last_login_at': (new Date(json['last_login_at'])),
        'type': WebAuthnTypeFromJSON(json['type']),
        'updated_at': (new Date(json['updated_at'])),
        'usage_count': json['usage_count'],
        'icons': WebAuthnIconsFromJSON(json['icons']),
    };
}

export function WebAuthnDevicesToJSON(json: any): WebAuthnDevices {
    return WebAuthnDevicesToJSONTyped(json, false);
}

export function WebAuthnDevicesToJSONTyped(value?: WebAuthnDevices | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'created_at': ((value['created_at']).toISOString()),
        'cred_id': value['cred_id'],
        'friendly_name': value['friendly_name'],
        'id': value['id'],
        'last_login_at': ((value['last_login_at']).toISOString()),
        'type': WebAuthnTypeToJSON(value['type']),
        'updated_at': ((value['updated_at']).toISOString()),
        'usage_count': value['usage_count'],
        'icons': WebAuthnIconsToJSON(value['icons']),
    };
}

