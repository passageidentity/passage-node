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
import type { ListFunctionVersionsItem } from './ListFunctionVersionsItem';
import {
    ListFunctionVersionsItemFromJSON,
    ListFunctionVersionsItemFromJSONTyped,
    ListFunctionVersionsItemToJSON,
} from './ListFunctionVersionsItem';

/**
 * 
 * @export
 * @interface ListFunctionVersionsResponse
 */
export interface ListFunctionVersionsResponse {
    /**
     * 
     * @type {Array<ListFunctionVersionsItem>}
     * @memberof ListFunctionVersionsResponse
     */
    functionVersions: Array<ListFunctionVersionsItem>;
}

/**
 * Check if a given object implements the ListFunctionVersionsResponse interface.
 */
export function instanceOfListFunctionVersionsResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "functionVersions" in value;

    return isInstance;
}

export function ListFunctionVersionsResponseFromJSON(json: any): ListFunctionVersionsResponse {
    return ListFunctionVersionsResponseFromJSONTyped(json, false);
}

export function ListFunctionVersionsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListFunctionVersionsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'functionVersions': ((json['function_versions'] as Array<any>).map(ListFunctionVersionsItemFromJSON)),
    };
}

export function ListFunctionVersionsResponseToJSON(value?: ListFunctionVersionsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'function_versions': ((value.functionVersions as Array<any>).map(ListFunctionVersionsItemToJSON)),
    };
}

