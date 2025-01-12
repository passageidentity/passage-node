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
/**
 * 
 * @export
 * @interface CreateUserArgs
 */
export interface CreateUserArgs {
    /**
     * Email of the new user. Either this or `phone` is required; both may be provided.
     * @type {string}
     * @memberof CreateUserArgs
     */
    email?: string;
    /**
     * Phone number of the new user. Either this or `email` is required; both may be provided.
     * @type {string}
     * @memberof CreateUserArgs
     */
    phone?: string;
    /**
     * 
     * @type {object}
     * @memberof CreateUserArgs
     */
    userMetadata?: object;
}

/**
 * Check if a given object implements the CreateUserArgs interface.
 */
export function instanceOfCreateUserArgs(value: object): value is CreateUserArgs {
    return true;
}

export function CreateUserArgsFromJSON(json: any): CreateUserArgs {
    return CreateUserArgsFromJSONTyped(json, false);
}

export function CreateUserArgsFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateUserArgs {
    if (json == null) {
        return json;
    }
    return {
        
        'email': json['email'] == null ? undefined : json['email'],
        'phone': json['phone'] == null ? undefined : json['phone'],
        'userMetadata': json['user_metadata'] == null ? undefined : json['user_metadata'],
    };
}

export function CreateUserArgsToJSON(json: any): CreateUserArgs {
    return CreateUserArgsToJSONTyped(json, false);
}

export function CreateUserArgsToJSONTyped(value?: CreateUserArgs | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'email': value['email'],
        'phone': value['phone'],
        'user_metadata': value['userMetadata'],
    };
}

