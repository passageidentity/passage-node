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
 * @interface Link
 */
export interface Link {
    /**
     * 
     * @type {string}
     * @memberof Link
     */
    href: string;
}

/**
 * Check if a given object implements the Link interface.
 */
export function instanceOfLink(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "href" in value;

    return isInstance;
}

export function LinkFromJSON(json: any): Link {
    return LinkFromJSONTyped(json, false);
}

export function LinkFromJSONTyped(json: any, ignoreDiscriminator: boolean): Link {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'href': json['href'],
    };
}

export function LinkToJSON(value?: Link | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'href': value.href,
    };
}

