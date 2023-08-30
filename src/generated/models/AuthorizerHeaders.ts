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
 * @interface AuthorizerHeaders
 */
export interface AuthorizerHeaders {
    /**
     * 
     * @type {string}
     * @memberof AuthorizerHeaders
     */
    authorization: string;
    /**
     * 
     * @type {string}
     * @memberof AuthorizerHeaders
     */
    ip?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthorizerHeaders
     */
    userAgent?: string;
}

/**
 * Check if a given object implements the AuthorizerHeaders interface.
 */
export function instanceOfAuthorizerHeaders(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "authorization" in value;

    return isInstance;
}

export function AuthorizerHeadersFromJSON(json: any): AuthorizerHeaders {
    return AuthorizerHeadersFromJSONTyped(json, false);
}

export function AuthorizerHeadersFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthorizerHeaders {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'authorization': json['authorization'],
        'ip': !exists(json, 'ip') ? undefined : json['ip'],
        'userAgent': !exists(json, 'user_agent') ? undefined : json['user_agent'],
    };
}

export function AuthorizerHeadersToJSON(value?: AuthorizerHeaders | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'authorization': value.authorization,
        'ip': value.ip,
        'user_agent': value.userAgent,
    };
}
