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
import type { Technologies } from './Technologies';
import {
    TechnologiesFromJSON,
    TechnologiesFromJSONTyped,
    TechnologiesToJSON,
} from './Technologies';

/**
 * 
 * @export
 * @interface CreateAppRequest
 */
export interface CreateAppRequest {
    /**
     * The valid URLs where users can be redirected after authentication.
     * @type {Array<string>}
     * @memberof CreateAppRequest
     */
    allowedCallbackUrls?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof CreateAppRequest
     */
    authOrigin?: string;
    /**
     * 
     * @type {boolean}
     * @memberof CreateAppRequest
     */
    hosted?: boolean;
    /**
     * the subdomain of the app's hosted login page
     * @type {string}
     * @memberof CreateAppRequest
     */
    hostedSubdomain?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateAppRequest
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateAppRequest
     */
    redirectUrl?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateAppRequest
     */
    organizationId?: string;
    /**
     * 
     * @type {Array<Technologies>}
     * @memberof CreateAppRequest
     */
    technologies?: Array<Technologies>;
    /**
     * 
     * @type {string}
     * @memberof CreateAppRequest
     */
    type?: CreateAppRequestTypeEnum;
}


/**
 * @export
 */
export const CreateAppRequestTypeEnum = {
    Complete: 'complete',
    Flex: 'flex'
} as const;
export type CreateAppRequestTypeEnum = typeof CreateAppRequestTypeEnum[keyof typeof CreateAppRequestTypeEnum];


/**
 * Check if a given object implements the CreateAppRequest interface.
 */
export function instanceOfCreateAppRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CreateAppRequestFromJSON(json: any): CreateAppRequest {
    return CreateAppRequestFromJSONTyped(json, false);
}

export function CreateAppRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateAppRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'allowedCallbackUrls': !exists(json, 'allowed_callback_urls') ? undefined : json['allowed_callback_urls'],
        'authOrigin': !exists(json, 'auth_origin') ? undefined : json['auth_origin'],
        'hosted': !exists(json, 'hosted') ? undefined : json['hosted'],
        'hostedSubdomain': !exists(json, 'hosted_subdomain') ? undefined : json['hosted_subdomain'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'redirectUrl': !exists(json, 'redirect_url') ? undefined : json['redirect_url'],
        'organizationId': !exists(json, 'organization_id') ? undefined : json['organization_id'],
        'technologies': !exists(json, 'technologies') ? undefined : ((json['technologies'] as Array<any>).map(TechnologiesFromJSON)),
        'type': !exists(json, 'type') ? undefined : json['type'],
    };
}

export function CreateAppRequestToJSON(value?: CreateAppRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'allowed_callback_urls': value.allowedCallbackUrls,
        'auth_origin': value.authOrigin,
        'hosted': value.hosted,
        'hosted_subdomain': value.hostedSubdomain,
        'name': value.name,
        'redirect_url': value.redirectUrl,
        'organization_id': value.organizationId,
        'technologies': value.technologies === undefined ? undefined : ((value.technologies as Array<any>).map(TechnologiesToJSON)),
        'type': value.type,
    };
}
