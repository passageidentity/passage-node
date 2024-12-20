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
/**
 * 
 * @export
 * @interface LayoutConfig
 */
export interface LayoutConfig {
    /**
     * 
     * @type {number}
     * @memberof LayoutConfig
     */
    h: number;
    /**
     * 
     * @type {string}
     * @memberof LayoutConfig
     */
    id: string;
    /**
     * 
     * @type {number}
     * @memberof LayoutConfig
     */
    w: number;
    /**
     * 
     * @type {number}
     * @memberof LayoutConfig
     */
    x: number;
    /**
     * 
     * @type {number}
     * @memberof LayoutConfig
     */
    y: number;
}

/**
 * Check if a given object implements the LayoutConfig interface.
 */
export function instanceOfLayoutConfig(value: object): value is LayoutConfig {
    if (!('h' in value) || value['h'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('w' in value) || value['w'] === undefined) return false;
    if (!('x' in value) || value['x'] === undefined) return false;
    if (!('y' in value) || value['y'] === undefined) return false;
    return true;
}

export function LayoutConfigFromJSON(json: any): LayoutConfig {
    return LayoutConfigFromJSONTyped(json, false);
}

export function LayoutConfigFromJSONTyped(json: any, ignoreDiscriminator: boolean): LayoutConfig {
    if (json == null) {
        return json;
    }
    return {
        
        'h': json['h'],
        'id': json['id'],
        'w': json['w'],
        'x': json['x'],
        'y': json['y'],
    };
}

export function LayoutConfigToJSON(json: any): LayoutConfig {
    return LayoutConfigToJSONTyped(json, false);
}

export function LayoutConfigToJSONTyped(value?: LayoutConfig | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'h': value['h'],
        'id': value['id'],
        'w': value['w'],
        'x': value['x'],
        'y': value['y'],
    };
}

