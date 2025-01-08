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
import type { MagicLinkType } from './MagicLinkType';
import {
    MagicLinkTypeFromJSON,
    MagicLinkTypeFromJSONTyped,
    MagicLinkTypeToJSON,
    MagicLinkTypeToJSONTyped,
} from './MagicLinkType';

/**
 * 
 * @export
 * @interface MagicLink
 */
export interface MagicLink {
    /**
     * 
     * @type {boolean}
     * @memberof MagicLink
     */
    activated: boolean;
    /**
     * 
     * @type {string}
     * @memberof MagicLink
     */
    appId: string;
    /**
     * 
     * @type {string}
     * @memberof MagicLink
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof MagicLink
     */
    identifier: string;
    /**
     * 
     * @type {string}
     * @memberof MagicLink
     */
    redirectUrl: string;
    /**
     * 
     * @type {string}
     * @memberof MagicLink
     */
    secret: string;
    /**
     * time to live in minutes
     * @type {number}
     * @memberof MagicLink
     */
    ttl: number;
    /**
     * 
     * @type {MagicLinkType}
     * @memberof MagicLink
     */
    type: MagicLinkType;
    /**
     * 
     * @type {string}
     * @memberof MagicLink
     */
    url: string;
    /**
     * 
     * @type {string}
     * @memberof MagicLink
     */
    userId: string;
}



/**
 * Check if a given object implements the MagicLink interface.
 */
export function instanceOfMagicLink(value: object): value is MagicLink {
    if (!('activated' in value) || value['activated'] === undefined) return false;
    if (!('appId' in value) || value['appId'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('identifier' in value) || value['identifier'] === undefined) return false;
    if (!('redirectUrl' in value) || value['redirectUrl'] === undefined) return false;
    if (!('secret' in value) || value['secret'] === undefined) return false;
    if (!('ttl' in value) || value['ttl'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('url' in value) || value['url'] === undefined) return false;
    if (!('userId' in value) || value['userId'] === undefined) return false;
    return true;
}

export function MagicLinkFromJSON(json: any): MagicLink {
    return MagicLinkFromJSONTyped(json, false);
}

export function MagicLinkFromJSONTyped(json: any, ignoreDiscriminator: boolean): MagicLink {
    if (json == null) {
        return json;
    }
    return {
        
        'activated': json['activated'],
        'appId': json['app_id'],
        'id': json['id'],
        'identifier': json['identifier'],
        'redirectUrl': json['redirect_url'],
        'secret': json['secret'],
        'ttl': json['ttl'],
        'type': MagicLinkTypeFromJSON(json['type']),
        'url': json['url'],
        'userId': json['user_id'],
    };
}

export function MagicLinkToJSON(json: any): MagicLink {
    return MagicLinkToJSONTyped(json, false);
}

export function MagicLinkToJSONTyped(value?: MagicLink | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'activated': value['activated'],
        'app_id': value['appId'],
        'id': value['id'],
        'identifier': value['identifier'],
        'redirect_url': value['redirectUrl'],
        'secret': value['secret'],
        'ttl': value['ttl'],
        'type': MagicLinkTypeToJSON(value['type']),
        'url': value['url'],
        'user_id': value['userId'],
    };
}

