/* tslint:disable */
/* eslint-disable */
/**
 * Passage Management API
 * Passage\'s management API to manage your Passage apps and users.
 *
 * The version of the OpenAPI document: v1
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
 * @interface Model401Error
 */
export interface Model401Error {
    /**
     * 
     * @type {string}
     * @memberof Model401Error
     */
    code: Model401ErrorCodeEnum;
    /**
     * 
     * @type {string}
     * @memberof Model401Error
     */
    error: string;
}


/**
 * @export
 */
export const Model401ErrorCodeEnum = {
    InvalidAccessToken: 'invalid_access_token'
} as const;
export type Model401ErrorCodeEnum = typeof Model401ErrorCodeEnum[keyof typeof Model401ErrorCodeEnum];


/**
 * Check if a given object implements the Model401Error interface.
 */
export function instanceOfModel401Error(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "code" in value;
    isInstance = isInstance && "error" in value;

    return isInstance;
}

export function Model401ErrorFromJSON(json: any): Model401Error {
    return Model401ErrorFromJSONTyped(json, false);
}

export function Model401ErrorFromJSONTyped(json: any, ignoreDiscriminator: boolean): Model401Error {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'code': json['code'],
        'error': json['error'],
    };
}

export function Model401ErrorToJSON(value?: Model401Error | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'code': value.code,
        'error': value.error,
    };
}

