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
import type { EventInfo } from './EventInfo';
import {
    EventInfoFromJSON,
    EventInfoFromJSONTyped,
    EventInfoToJSON,
} from './EventInfo';
import type { PaginatedLinks } from './PaginatedLinks';
import {
    PaginatedLinksFromJSON,
    PaginatedLinksFromJSONTyped,
    PaginatedLinksToJSON,
} from './PaginatedLinks';

/**
 * 
 * @export
 * @interface ListPaginatedEventsResponse
 */
export interface ListPaginatedEventsResponse {
    /**
     * 
     * @type {PaginatedLinks}
     * @memberof ListPaginatedEventsResponse
     */
    _links: PaginatedLinks;
    /**
     * time anchor (Unix timestamp) --> all events returned were created before this timestamp
     * @type {number}
     * @memberof ListPaginatedEventsResponse
     */
    created_before: number;
    /**
     * 
     * @type {Array<EventInfo>}
     * @memberof ListPaginatedEventsResponse
     */
    events: Array<EventInfo>;
    /**
     * 
     * @type {number}
     * @memberof ListPaginatedEventsResponse
     */
    limit: number;
    /**
     * 
     * @type {number}
     * @memberof ListPaginatedEventsResponse
     */
    page: number;
    /**
     * total number of event for a particular query
     * @type {number}
     * @memberof ListPaginatedEventsResponse
     */
    total_events: number;
}

/**
 * Check if a given object implements the ListPaginatedEventsResponse interface.
 */
export function instanceOfListPaginatedEventsResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "_links" in value;
    isInstance = isInstance && "created_before" in value;
    isInstance = isInstance && "events" in value;
    isInstance = isInstance && "limit" in value;
    isInstance = isInstance && "page" in value;
    isInstance = isInstance && "total_events" in value;

    return isInstance;
}

export function ListPaginatedEventsResponseFromJSON(json: any): ListPaginatedEventsResponse {
    return ListPaginatedEventsResponseFromJSONTyped(json, false);
}

export function ListPaginatedEventsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListPaginatedEventsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        '_links': PaginatedLinksFromJSON(json['_links']),
        'created_before': json['created_before'],
        'events': ((json['events'] as Array<any>).map(EventInfoFromJSON)),
        'limit': json['limit'],
        'page': json['page'],
        'total_events': json['total_events'],
    };
}

export function ListPaginatedEventsResponseToJSON(value?: ListPaginatedEventsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        '_links': PaginatedLinksToJSON(value._links),
        'created_before': value.created_before,
        'events': ((value.events as Array<any>).map(EventInfoToJSON)),
        'limit': value.limit,
        'page': value.page,
        'total_events': value.total_events,
    };
}

