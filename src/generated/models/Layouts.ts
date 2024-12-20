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
import type { LayoutConfig } from './LayoutConfig';
import {
    LayoutConfigFromJSON,
    LayoutConfigFromJSONTyped,
    LayoutConfigToJSON,
    LayoutConfigToJSONTyped,
} from './LayoutConfig';

/**
 * 
 * @export
 * @interface Layouts
 */
export interface Layouts {
    /**
     * 
     * @type {Array<LayoutConfig>}
     * @memberof Layouts
     */
    profile: Array<LayoutConfig>;
    /**
     * 
     * @type {Array<LayoutConfig>}
     * @memberof Layouts
     */
    registration: Array<LayoutConfig>;
}

/**
 * Check if a given object implements the Layouts interface.
 */
export function instanceOfLayouts(value: object): value is Layouts {
    if (!('profile' in value) || value['profile'] === undefined) return false;
    if (!('registration' in value) || value['registration'] === undefined) return false;
    return true;
}

export function LayoutsFromJSON(json: any): Layouts {
    return LayoutsFromJSONTyped(json, false);
}

export function LayoutsFromJSONTyped(json: any, ignoreDiscriminator: boolean): Layouts {
    if (json == null) {
        return json;
    }
    return {
        
        'profile': ((json['profile'] as Array<any>).map(LayoutConfigFromJSON)),
        'registration': ((json['registration'] as Array<any>).map(LayoutConfigFromJSON)),
    };
}

export function LayoutsToJSON(json: any): Layouts {
    return LayoutsToJSONTyped(json, false);
}

export function LayoutsToJSONTyped(value?: Layouts | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'profile': ((value['profile'] as Array<any>).map(LayoutConfigToJSON)),
        'registration': ((value['registration'] as Array<any>).map(LayoutConfigToJSON)),
    };
}

