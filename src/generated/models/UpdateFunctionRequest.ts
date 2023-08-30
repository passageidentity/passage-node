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
import type { Language } from './Language';
import {
    LanguageFromJSON,
    LanguageFromJSONTyped,
    LanguageToJSON,
} from './Language';

/**
 * 
 * @export
 * @interface UpdateFunctionRequest
 */
export interface UpdateFunctionRequest {
    /**
     * 
     * @type {string}
     * @memberof UpdateFunctionRequest
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateFunctionRequest
     */
    code: string;
    /**
     * 
     * @type {Language}
     * @memberof UpdateFunctionRequest
     */
    language: Language;
}

/**
 * Check if a given object implements the UpdateFunctionRequest interface.
 */
export function instanceOfUpdateFunctionRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "code" in value;
    isInstance = isInstance && "language" in value;

    return isInstance;
}

export function UpdateFunctionRequestFromJSON(json: any): UpdateFunctionRequest {
    return UpdateFunctionRequestFromJSONTyped(json, false);
}

export function UpdateFunctionRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateFunctionRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'code': json['code'],
        'language': LanguageFromJSON(json['language']),
    };
}

export function UpdateFunctionRequestToJSON(value?: UpdateFunctionRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'code': value.code,
        'language': LanguageToJSON(value.language),
    };
}
