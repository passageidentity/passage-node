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
import type { BootFailureEventAllOfEvent } from './BootFailureEventAllOfEvent';
import {
    BootFailureEventAllOfEventFromJSON,
    BootFailureEventAllOfEventFromJSONTyped,
    BootFailureEventAllOfEventToJSON,
} from './BootFailureEventAllOfEvent';

/**
 * 
 * @export
 * @interface BootFailureEventAllOf
 */
export interface BootFailureEventAllOf {
    /**
     * 
     * @type {BootFailureEventAllOfEvent}
     * @memberof BootFailureEventAllOf
     */
    event: BootFailureEventAllOfEvent;
}

/**
 * Check if a given object implements the BootFailureEventAllOf interface.
 */
export function instanceOfBootFailureEventAllOf(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "event" in value;

    return isInstance;
}

export function BootFailureEventAllOfFromJSON(json: any): BootFailureEventAllOf {
    return BootFailureEventAllOfFromJSONTyped(json, false);
}

export function BootFailureEventAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): BootFailureEventAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'event': BootFailureEventAllOfEventFromJSON(json['event']),
    };
}

export function BootFailureEventAllOfToJSON(value?: BootFailureEventAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'event': BootFailureEventAllOfEventToJSON(value.event),
    };
}
