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


/**
 * 
 * @export
 */
export const MagicLinkChannel = {
    Email: 'email',
    Phone: 'phone'
} as const;
export type MagicLinkChannel = typeof MagicLinkChannel[keyof typeof MagicLinkChannel];


export function instanceOfMagicLinkChannel(value: any): boolean {
    for (const key in MagicLinkChannel) {
        if (Object.prototype.hasOwnProperty.call(MagicLinkChannel, key)) {
            if (MagicLinkChannel[key as keyof typeof MagicLinkChannel] === value) {
                return true;
            }
        }
    }
    return false;
}

export function MagicLinkChannelFromJSON(json: any): MagicLinkChannel {
    return MagicLinkChannelFromJSONTyped(json, false);
}

export function MagicLinkChannelFromJSONTyped(json: any, ignoreDiscriminator: boolean): MagicLinkChannel {
    return json as MagicLinkChannel;
}

export function MagicLinkChannelToJSON(value?: MagicLinkChannel | null): any {
    return value as any;
}

export function MagicLinkChannelToJSONTyped(value: any, ignoreDiscriminator: boolean): MagicLinkChannel {
    return value as MagicLinkChannel;
}

