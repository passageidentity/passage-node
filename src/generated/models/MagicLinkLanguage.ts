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
 * language of the email or sms to send
 * @export
 */
export const MagicLinkLanguage = {
    De: 'de',
    En: 'en',
    Es: 'es',
    It: 'it',
    Pl: 'pl',
    Pt: 'pt',
    Zh: 'zh'
} as const;
export type MagicLinkLanguage = typeof MagicLinkLanguage[keyof typeof MagicLinkLanguage];


export function instanceOfMagicLinkLanguage(value: any): boolean {
    for (const key in MagicLinkLanguage) {
        if (Object.prototype.hasOwnProperty.call(MagicLinkLanguage, key)) {
            if (MagicLinkLanguage[key as keyof typeof MagicLinkLanguage] === value) {
                return true;
            }
        }
    }
    return false;
}

export function MagicLinkLanguageFromJSON(json: any): MagicLinkLanguage {
    return MagicLinkLanguageFromJSONTyped(json, false);
}

export function MagicLinkLanguageFromJSONTyped(json: any, ignoreDiscriminator: boolean): MagicLinkLanguage {
    return json as MagicLinkLanguage;
}

export function MagicLinkLanguageToJSON(value?: MagicLinkLanguage | null): any {
    return value as any;
}

export function MagicLinkLanguageToJSONTyped(value: any, ignoreDiscriminator: boolean): MagicLinkLanguage {
    return value as MagicLinkLanguage;
}

