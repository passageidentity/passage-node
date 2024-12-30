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
import type { TtlDisplayUnit } from './TtlDisplayUnit';
import {
    TtlDisplayUnitFromJSON,
    TtlDisplayUnitFromJSONTyped,
    TtlDisplayUnitToJSON,
    TtlDisplayUnitToJSONTyped,
} from './TtlDisplayUnit';

/**
 * 
 * @export
 * @interface OtpAuthMethod
 */
export interface OtpAuthMethod {
    /**
     * 
     * @type {boolean}
     * @memberof OtpAuthMethod
     */
    enabled: boolean;
    /**
     * Maximum time (IN SECONDS) for the auth to expire.
     * @type {number}
     * @memberof OtpAuthMethod
     */
    ttl: number;
    /**
     * 
     * @type {TtlDisplayUnit}
     * @memberof OtpAuthMethod
     * @deprecated
     */
    ttlDisplayUnit: TtlDisplayUnit;
}



/**
 * Check if a given object implements the OtpAuthMethod interface.
 */
export function instanceOfOtpAuthMethod(value: object): value is OtpAuthMethod {
    if (!('enabled' in value) || value['enabled'] === undefined) return false;
    if (!('ttl' in value) || value['ttl'] === undefined) return false;
    if (!('ttlDisplayUnit' in value) || value['ttlDisplayUnit'] === undefined) return false;
    return true;
}

export function OtpAuthMethodFromJSON(json: any): OtpAuthMethod {
    return OtpAuthMethodFromJSONTyped(json, false);
}

export function OtpAuthMethodFromJSONTyped(json: any, ignoreDiscriminator: boolean): OtpAuthMethod {
    if (json == null) {
        return json;
    }
    return {
        
        'enabled': json['enabled'],
        'ttl': json['ttl'],
        'ttlDisplayUnit': TtlDisplayUnitFromJSON(json['ttl_display_unit']),
    };
}

export function OtpAuthMethodToJSON(json: any): OtpAuthMethod {
    return OtpAuthMethodToJSONTyped(json, false);
}

export function OtpAuthMethodToJSONTyped(value?: OtpAuthMethod | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'enabled': value['enabled'],
        'ttl': value['ttl'],
        'ttl_display_unit': TtlDisplayUnitToJSON(value['ttlDisplayUnit']),
    };
}

