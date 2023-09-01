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
    app_id: string;
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
    redirect_url: string;
    /**
     * 
     * @type {string}
     * @memberof MagicLink
     */
    secret: string;
    /**
     * 
     * @type {number}
     * @memberof MagicLink
     */
    ttl: number;
    /**
     * 
     * @type {string}
     * @memberof MagicLink
     */
    type: string;
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
    user_id: string;
}

/**
 * Check if a given object implements the MagicLink interface.
 */
export function instanceOfMagicLink(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "activated" in value;
    isInstance = isInstance && "app_id" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "identifier" in value;
    isInstance = isInstance && "redirect_url" in value;
    isInstance = isInstance && "secret" in value;
    isInstance = isInstance && "ttl" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "url" in value;
    isInstance = isInstance && "user_id" in value;

    return isInstance;
}

export function MagicLinkFromJSON(json: any): MagicLink {
    return MagicLinkFromJSONTyped(json, false);
}

export function MagicLinkFromJSONTyped(json: any, ignoreDiscriminator: boolean): MagicLink {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'activated': json['activated'],
        'app_id': json['app_id'],
        'id': json['id'],
        'identifier': json['identifier'],
        'redirect_url': json['redirect_url'],
        'secret': json['secret'],
        'ttl': json['ttl'],
        'type': json['type'],
        'url': json['url'],
        'user_id': json['user_id'],
    };
}

export function MagicLinkToJSON(value?: MagicLink | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'activated': value.activated,
        'app_id': value.app_id,
        'id': value.id,
        'identifier': value.identifier,
        'redirect_url': value.redirect_url,
        'secret': value.secret,
        'ttl': value.ttl,
        'type': value.type,
        'url': value.url,
        'user_id': value.user_id,
    };
}

