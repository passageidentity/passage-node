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
 * @interface MagicLinkAuthMethod
 */
export interface MagicLinkAuthMethod {
    /**
     * 
     * @type {boolean}
     * @memberof MagicLinkAuthMethod
     */
    enabled: boolean;
    /**
     * Maximum time (IN SECONDS) for the auth to expire.
     * @type {number}
     * @memberof MagicLinkAuthMethod
     */
    ttl: number;
    /**
     * 
     * @type {TtlDisplayUnit}
     * @memberof MagicLinkAuthMethod
     * @deprecated
     */
    ttl_display_unit: TtlDisplayUnit;
}



/**
 * Check if a given object implements the MagicLinkAuthMethod interface.
 */
export function instanceOfMagicLinkAuthMethod(value: object): value is MagicLinkAuthMethod {
    if (!('enabled' in value) || value['enabled'] === undefined) return false;
    if (!('ttl' in value) || value['ttl'] === undefined) return false;
    if (!('ttl_display_unit' in value) || value['ttl_display_unit'] === undefined) return false;
    return true;
}

export function MagicLinkAuthMethodFromJSON(json: any): MagicLinkAuthMethod {
    return MagicLinkAuthMethodFromJSONTyped(json, false);
}

export function MagicLinkAuthMethodFromJSONTyped(json: any, ignoreDiscriminator: boolean): MagicLinkAuthMethod {
    if (json == null) {
        return json;
    }
    return {
        
        'enabled': json['enabled'],
        'ttl': json['ttl'],
        'ttl_display_unit': TtlDisplayUnitFromJSON(json['ttl_display_unit']),
    };
}

export function MagicLinkAuthMethodToJSON(json: any): MagicLinkAuthMethod {
    return MagicLinkAuthMethodToJSONTyped(json, false);
}

export function MagicLinkAuthMethodToJSONTyped(value?: MagicLinkAuthMethod | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'enabled': value['enabled'],
        'ttl': value['ttl'],
        'ttl_display_unit': TtlDisplayUnitToJSON(value['ttl_display_unit']),
    };
}

