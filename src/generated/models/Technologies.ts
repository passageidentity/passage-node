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
export const Technologies = {
    React: 'react',
    Go: 'go',
    Vue: 'vue',
    Angular: 'angular',
    Python: 'python',
    Javascript: 'javascript',
    Ios: 'ios',
    Android: 'android'
} as const;
export type Technologies = typeof Technologies[keyof typeof Technologies];


export function TechnologiesFromJSON(json: any): Technologies {
    return TechnologiesFromJSONTyped(json, false);
}

export function TechnologiesFromJSONTyped(json: any, ignoreDiscriminator: boolean): Technologies {
    return json as Technologies;
}

export function TechnologiesToJSON(value?: Technologies | null): any {
    return value as any;
}

