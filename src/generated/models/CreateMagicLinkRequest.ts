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
import type { MagicLinkType } from './MagicLinkType';
import {
    MagicLinkTypeFromJSON,
    MagicLinkTypeFromJSONTyped,
    MagicLinkTypeToJSON,
} from './MagicLinkType';

/**
 * 
 * @export
 * @interface CreateMagicLinkRequest
 */
export interface CreateMagicLinkRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateMagicLinkRequest
     */
    channel: CreateMagicLinkRequestChannelEnum;
    /**
     * 
     * @type {string}
     * @memberof CreateMagicLinkRequest
     */
    email: string;
    /**
     * language of the email to send (optional)
     * @type {string}
     * @memberof CreateMagicLinkRequest
     */
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateMagicLinkRequest
     */
    magic_link_path: string;
    /**
     * 
     * @type {string}
     * @memberof CreateMagicLinkRequest
     */
    phone: string;
    /**
     * 
     * @type {string}
     * @memberof CreateMagicLinkRequest
     */
    redirect_url: string;
    /**
     * 
     * @type {boolean}
     * @memberof CreateMagicLinkRequest
     */
    send: boolean;
    /**
     * 
     * @type {number}
     * @memberof CreateMagicLinkRequest
     */
    ttl: number;
    /**
     * 
     * @type {MagicLinkType}
     * @memberof CreateMagicLinkRequest
     */
    type?: MagicLinkType;
    /**
     * 
     * @type {string}
     * @memberof CreateMagicLinkRequest
     */
    user_id: string;
}


/**
 * @export
 */
export const CreateMagicLinkRequestChannelEnum = {
    Email: 'email',
    Phone: 'phone'
} as const;
export type CreateMagicLinkRequestChannelEnum = typeof CreateMagicLinkRequestChannelEnum[keyof typeof CreateMagicLinkRequestChannelEnum];


/**
 * Check if a given object implements the CreateMagicLinkRequest interface.
 */
export function instanceOfCreateMagicLinkRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "channel" in value;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "magic_link_path" in value;
    isInstance = isInstance && "phone" in value;
    isInstance = isInstance && "redirect_url" in value;
    isInstance = isInstance && "send" in value;
    isInstance = isInstance && "ttl" in value;
    isInstance = isInstance && "user_id" in value;

    return isInstance;
}

export function CreateMagicLinkRequestFromJSON(json: any): CreateMagicLinkRequest {
    return CreateMagicLinkRequestFromJSONTyped(json, false);
}

export function CreateMagicLinkRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateMagicLinkRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'channel': json['channel'],
        'email': json['email'],
        'language': !exists(json, 'language') ? undefined : json['language'],
        'magic_link_path': json['magic_link_path'],
        'phone': json['phone'],
        'redirect_url': json['redirect_url'],
        'send': json['send'],
        'ttl': json['ttl'],
        'type': !exists(json, 'type') ? undefined : MagicLinkTypeFromJSON(json['type']),
        'user_id': json['user_id'],
    };
}

export function CreateMagicLinkRequestToJSON(value?: CreateMagicLinkRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'channel': value.channel,
        'email': value.email,
        'language': value.language,
        'magic_link_path': value.magic_link_path,
        'phone': value.phone,
        'redirect_url': value.redirect_url,
        'send': value.send,
        'ttl': value.ttl,
        'type': MagicLinkTypeToJSON(value.type),
        'user_id': value.user_id,
    };
}

