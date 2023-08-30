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
 * @interface MemoryLimitEvent
 */
export interface MemoryLimitEvent {
    /**
     * The ID of the deployment that caused this event to be generated.
     * @type {string}
     * @memberof MemoryLimitEvent
     */
    deploymentId: string;
    /**
     * The type of event.
     * @type {string}
     * @memberof MemoryLimitEvent
     */
    eventType: MemoryLimitEventEventTypeEnum;
    /**
     * Timestamp for when this event was created, in RFC3339 format.
     * @type {Date}
     * @memberof MemoryLimitEvent
     */
    timestamp: Date;
    /**
     * If the event was caused by a running isolate, this field contains the opaque ID of the given isolate.
     * @type {string}
     * @memberof MemoryLimitEvent
     */
    isolateId?: string;
    /**
     * The region where the event was generated. Refer to https://deno.com/deploy/docs/regions for possible values.
     * @type {string}
     * @memberof MemoryLimitEvent
     */
    region: string;
    /**
     * 
     * @type {object}
     * @memberof MemoryLimitEvent
     */
    event: object;
}


/**
 * @export
 */
export const MemoryLimitEventEventTypeEnum = {
    Boot: 'boot',
    BootFailure: 'bootFailure',
    Log: 'log',
    UncaughtException: 'uncaughtException',
    MemoryLimit: 'memoryLimit',
    TimeLimit: 'timeLimit'
} as const;
export type MemoryLimitEventEventTypeEnum = typeof MemoryLimitEventEventTypeEnum[keyof typeof MemoryLimitEventEventTypeEnum];


/**
 * Check if a given object implements the MemoryLimitEvent interface.
 */
export function instanceOfMemoryLimitEvent(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "deploymentId" in value;
    isInstance = isInstance && "eventType" in value;
    isInstance = isInstance && "timestamp" in value;
    isInstance = isInstance && "region" in value;
    isInstance = isInstance && "event" in value;

    return isInstance;
}

export function MemoryLimitEventFromJSON(json: any): MemoryLimitEvent {
    return MemoryLimitEventFromJSONTyped(json, false);
}

export function MemoryLimitEventFromJSONTyped(json: any, ignoreDiscriminator: boolean): MemoryLimitEvent {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'deploymentId': json['deployment_id'],
        'eventType': json['event_type'],
        'timestamp': (new Date(json['timestamp'])),
        'isolateId': !exists(json, 'isolate_id') ? undefined : json['isolate_id'],
        'region': json['region'],
        'event': json['event'],
    };
}

export function MemoryLimitEventToJSON(value?: MemoryLimitEvent | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'deployment_id': value.deploymentId,
        'event_type': value.eventType,
        'timestamp': (value.timestamp.toISOString()),
        'isolate_id': value.isolateId,
        'region': value.region,
        'event': value.event,
    };
}
