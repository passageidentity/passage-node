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
 * @interface TestError
 */
export interface TestError {
    /**
     * 
     * @type {string}
     * @memberof TestError
     */
    message?: string;
    /**
     * 
     * @type {string}
     * @memberof TestError
     */
    stack?: string;
}

/**
 * Check if a given object implements the TestError interface.
 */
export function instanceOfTestError(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TestErrorFromJSON(json: any): TestError {
    return TestErrorFromJSONTyped(json, false);
}

export function TestErrorFromJSONTyped(json: any, ignoreDiscriminator: boolean): TestError {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'message': !exists(json, 'message') ? undefined : json['message'],
        'stack': !exists(json, 'stack') ? undefined : json['stack'],
    };
}

export function TestErrorToJSON(value?: TestError | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'message': value.message,
        'stack': value.stack,
    };
}

