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
import type { TtlDisplayUnit } from './TtlDisplayUnit';
import {
    TtlDisplayUnitFromJSON,
    TtlDisplayUnitFromJSONTyped,
    TtlDisplayUnitToJSON,
} from './TtlDisplayUnit';

/**
 * 
 * @export
 * @interface UpdateEmailSmsAuthMethod
 */
export interface UpdateEmailSmsAuthMethod {
    /**
     * 
     * @type {boolean}
     * @memberof UpdateEmailSmsAuthMethod
     */
    enabled?: boolean;
    /**
     * Maximum time (IN SECONDS) for the auth to expire.
     * @type {number}
     * @memberof UpdateEmailSmsAuthMethod
     */
    ttl?: number;
    /**
     * 
     * @type {TtlDisplayUnit}
     * @memberof UpdateEmailSmsAuthMethod
     * @deprecated
     */
    ttl_display_unit?: TtlDisplayUnit;
}

/**
 * Check if a given object implements the UpdateEmailSmsAuthMethod interface.
 */
export function instanceOfUpdateEmailSmsAuthMethod(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdateEmailSmsAuthMethodFromJSON(json: any): UpdateEmailSmsAuthMethod {
    return UpdateEmailSmsAuthMethodFromJSONTyped(json, false);
}

export function UpdateEmailSmsAuthMethodFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateEmailSmsAuthMethod {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'enabled': !exists(json, 'enabled') ? undefined : json['enabled'],
        'ttl': !exists(json, 'ttl') ? undefined : json['ttl'],
        'ttl_display_unit': !exists(json, 'ttl_display_unit') ? undefined : TtlDisplayUnitFromJSON(json['ttl_display_unit']),
    };
}

export function UpdateEmailSmsAuthMethodToJSON(value?: UpdateEmailSmsAuthMethod | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'enabled': value.enabled,
        'ttl': value.ttl,
        'ttl_display_unit': TtlDisplayUnitToJSON(value.ttl_display_unit),
    };
}

