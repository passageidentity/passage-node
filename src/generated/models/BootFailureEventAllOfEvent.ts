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
 * @interface BootFailureEventAllOfEvent
 */
export interface BootFailureEventAllOfEvent {
    /**
     * A human readable message containing information about why the isolate failed to boot.
     * @type {string}
     * @memberof BootFailureEventAllOfEvent
     */
    msg: string;
}

/**
 * Check if a given object implements the BootFailureEventAllOfEvent interface.
 */
export function instanceOfBootFailureEventAllOfEvent(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "msg" in value;

    return isInstance;
}

export function BootFailureEventAllOfEventFromJSON(json: any): BootFailureEventAllOfEvent {
    return BootFailureEventAllOfEventFromJSONTyped(json, false);
}

export function BootFailureEventAllOfEventFromJSONTyped(json: any, ignoreDiscriminator: boolean): BootFailureEventAllOfEvent {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'msg': json['msg'],
    };
}

export function BootFailureEventAllOfEventToJSON(value?: BootFailureEventAllOfEvent | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'msg': value.msg,
    };
}
