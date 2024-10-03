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
import type { SocialConnectionType } from './SocialConnectionType';
import {
    SocialConnectionTypeFromJSON,
    SocialConnectionTypeFromJSONTyped,
    SocialConnectionTypeToJSON,
} from './SocialConnectionType';
import type { UserEventAction } from './UserEventAction';
import {
    UserEventActionFromJSON,
    UserEventActionFromJSONTyped,
    UserEventActionToJSON,
} from './UserEventAction';
import type { UserEventStatus } from './UserEventStatus';
import {
    UserEventStatusFromJSON,
    UserEventStatusFromJSONTyped,
    UserEventStatusToJSON,
} from './UserEventStatus';

/**
 * 
 * @export
 * @interface UserRecentEvent
 */
export interface UserRecentEvent {
    /**
     * 
     * @type {Date}
     * @memberof UserRecentEvent
     */
    created_at: Date;
    /**
     * 
     * @type {Date}
     * @memberof UserRecentEvent
     */
    completed_at: Date | null;
    /**
     * 
     * @type {string}
     * @memberof UserRecentEvent
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof UserRecentEvent
     */
    ip_addr: string;
    /**
     * 
     * @type {UserEventStatus}
     * @memberof UserRecentEvent
     */
    status: UserEventStatus;
    /**
     * 
     * @type {string}
     * @memberof UserRecentEvent
     */
    type: string;
    /**
     * 
     * @type {string}
     * @memberof UserRecentEvent
     */
    user_agent: string;
    /**
     * 
     * @type {UserEventAction}
     * @memberof UserRecentEvent
     */
    action: UserEventAction;
    /**
     * 
     * @type {SocialConnectionType}
     * @memberof UserRecentEvent
     */
    social_login_type: SocialConnectionType | null;
}

/**
 * Check if a given object implements the UserRecentEvent interface.
 */
export function instanceOfUserRecentEvent(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "created_at" in value;
    isInstance = isInstance && "completed_at" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "ip_addr" in value;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "user_agent" in value;
    isInstance = isInstance && "action" in value;
    isInstance = isInstance && "social_login_type" in value;

    return isInstance;
}

export function UserRecentEventFromJSON(json: any): UserRecentEvent {
    return UserRecentEventFromJSONTyped(json, false);
}

export function UserRecentEventFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserRecentEvent {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'created_at': (new Date(json['created_at'])),
        'completed_at': (json['completed_at'] === null ? null : new Date(json['completed_at'])),
        'id': json['id'],
        'ip_addr': json['ip_addr'],
        'status': UserEventStatusFromJSON(json['status']),
        'type': json['type'],
        'user_agent': json['user_agent'],
        'action': UserEventActionFromJSON(json['action']),
        'social_login_type': SocialConnectionTypeFromJSON(json['social_login_type']),
    };
}

export function UserRecentEventToJSON(value?: UserRecentEvent | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'created_at': (value.created_at.toISOString()),
        'completed_at': (value.completed_at === null ? null : value.completed_at.toISOString()),
        'id': value.id,
        'ip_addr': value.ip_addr,
        'status': UserEventStatusToJSON(value.status),
        'type': value.type,
        'user_agent': value.user_agent,
        'action': UserEventActionToJSON(value.action),
        'social_login_type': SocialConnectionTypeToJSON(value.social_login_type),
    };
}

