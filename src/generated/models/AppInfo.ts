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
import type { AuthMethods } from './AuthMethods';
import {
    AuthMethodsFromJSON,
    AuthMethodsFromJSONTyped,
    AuthMethodsToJSON,
    AuthMethodsToJSONTyped,
} from './AuthMethods';
import type { Layouts } from './Layouts';
import {
    LayoutsFromJSON,
    LayoutsFromJSONTyped,
    LayoutsToJSON,
    LayoutsToJSONTyped,
} from './Layouts';
import type { ThemeType } from './ThemeType';
import {
    ThemeTypeFromJSON,
    ThemeTypeFromJSONTyped,
    ThemeTypeToJSON,
    ThemeTypeToJSONTyped,
} from './ThemeType';
import type { UserMetadataField } from './UserMetadataField';
import {
    UserMetadataFieldFromJSON,
    UserMetadataFieldFromJSONTyped,
    UserMetadataFieldToJSON,
    UserMetadataFieldToJSONTyped,
} from './UserMetadataField';
import type { ElementCustomization } from './ElementCustomization';
import {
    ElementCustomizationFromJSON,
    ElementCustomizationFromJSONTyped,
    ElementCustomizationToJSON,
    ElementCustomizationToJSONTyped,
} from './ElementCustomization';
import type { Technologies } from './Technologies';
import {
    TechnologiesFromJSON,
    TechnologiesFromJSONTyped,
    TechnologiesToJSON,
    TechnologiesToJSONTyped,
} from './Technologies';

/**
 * 
 * @export
 * @interface AppInfo
 */
export interface AppInfo {
    /**
     * 
     * @type {Array<string>}
     * @memberof AppInfo
     */
    additional_auth_origins: Array<string>;
    /**
     * The valid URLs where users can be redirected after authentication.
     * @type {Array<string>}
     * @memberof AppInfo
     */
    allowed_callback_urls: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    allowed_identifier: string;
    /**
     * The valid URLs where users can be redirected after logging out.
     * @type {Array<string>}
     * @memberof AppInfo
     */
    allowed_logout_urls: Array<string>;
    /**
     * A route within your application that redirects to the Authorization URL endpoint.
     * @type {string}
     * @memberof AppInfo
     */
    application_login_uri: string;
    /**
     * Deprecated Property. Please refer to `auth_methods` to view settings for individual authentication methods.
     * @type {string}
     * @memberof AppInfo
     * @deprecated
     */
    auth_fallback_method: string;
    /**
     * Deprecated Property. Please refer to `auth_methods` to view settings for individual authentication methods.
     * @type {number}
     * @memberof AppInfo
     * @deprecated
     */
    auth_fallback_method_ttl: number;
    /**
     * 
     * @type {AuthMethods}
     * @memberof AppInfo
     */
    auth_methods: AuthMethods;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    auth_origin: string;
    /**
     * Deprecated Property. Please use `hosted_theme` to set hosted page theming instead.
     * @type {boolean}
     * @memberof AppInfo
     * @deprecated
     */
    auto_theme_enabled: boolean;
    /**
     * 
     * @type {Date}
     * @memberof AppInfo
     */
    created_at: Date;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    default_language: string;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    id: string;
    /**
     * 
     * @type {Layouts}
     * @memberof AppInfo
     */
    layouts: Layouts;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    login_url: string;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    light_logo_url?: string;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    dark_logo_url?: string;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    name: string;
    /**
     * whether or not the app's login page is hosted by Passage
     * @type {boolean}
     * @memberof AppInfo
     */
    hosted: boolean;
    /**
     * the subdomain of the app's hosted login page
     * @type {string}
     * @memberof AppInfo
     */
    hosted_subdomain: string;
    /**
     * 
     * @type {ThemeType}
     * @memberof AppInfo
     */
    hosted_theme: ThemeType;
    /**
     * 
     * @type {number}
     * @memberof AppInfo
     */
    id_token_lifetime?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AppInfo
     */
    passage_branding: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AppInfo
     */
    profile_management: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AppInfo
     */
    public_signup: boolean;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    redirect_url: string;
    /**
     * 
     * @type {number}
     * @memberof AppInfo
     */
    refresh_absolute_lifetime: number;
    /**
     * 
     * @type {boolean}
     * @memberof AppInfo
     */
    refresh_enabled: boolean;
    /**
     * 
     * @type {number}
     * @memberof AppInfo
     */
    refresh_inactivity_lifetime: number;
    /**
     * 
     * @type {boolean}
     * @memberof AppInfo
     */
    require_email_verification: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AppInfo
     */
    require_identifier_verification: boolean;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    required_identifier: string;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    role: string;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    rsa_public_key: string;
    /**
     * can only be retrieved by an app admin
     * @type {string}
     * @memberof AppInfo
     */
    secret?: string;
    /**
     * 
     * @type {number}
     * @memberof AppInfo
     */
    session_timeout_length: number;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    type: AppInfoTypeEnum;
    /**
     * 
     * @type {Array<UserMetadataField>}
     * @memberof AppInfo
     */
    user_metadata_schema: Array<UserMetadataField>;
    /**
     * 
     * @type {Array<Technologies>}
     * @memberof AppInfo
     */
    technologies: Array<Technologies>;
    /**
     * 
     * @type {ElementCustomization}
     * @memberof AppInfo
     */
    element_customization: ElementCustomization;
    /**
     * 
     * @type {ElementCustomization}
     * @memberof AppInfo
     */
    element_customization_dark: ElementCustomization;
}


/**
 * @export
 */
export const AppInfoTypeEnum = {
    Complete: 'complete',
    Flex: 'flex'
} as const;
export type AppInfoTypeEnum = typeof AppInfoTypeEnum[keyof typeof AppInfoTypeEnum];


/**
 * Check if a given object implements the AppInfo interface.
 */
export function instanceOfAppInfo(value: object): value is AppInfo {
    if (!('additional_auth_origins' in value) || value['additional_auth_origins'] === undefined) return false;
    if (!('allowed_callback_urls' in value) || value['allowed_callback_urls'] === undefined) return false;
    if (!('allowed_identifier' in value) || value['allowed_identifier'] === undefined) return false;
    if (!('allowed_logout_urls' in value) || value['allowed_logout_urls'] === undefined) return false;
    if (!('application_login_uri' in value) || value['application_login_uri'] === undefined) return false;
    if (!('auth_fallback_method' in value) || value['auth_fallback_method'] === undefined) return false;
    if (!('auth_fallback_method_ttl' in value) || value['auth_fallback_method_ttl'] === undefined) return false;
    if (!('auth_methods' in value) || value['auth_methods'] === undefined) return false;
    if (!('auth_origin' in value) || value['auth_origin'] === undefined) return false;
    if (!('auto_theme_enabled' in value) || value['auto_theme_enabled'] === undefined) return false;
    if (!('created_at' in value) || value['created_at'] === undefined) return false;
    if (!('default_language' in value) || value['default_language'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('layouts' in value) || value['layouts'] === undefined) return false;
    if (!('login_url' in value) || value['login_url'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('hosted' in value) || value['hosted'] === undefined) return false;
    if (!('hosted_subdomain' in value) || value['hosted_subdomain'] === undefined) return false;
    if (!('hosted_theme' in value) || value['hosted_theme'] === undefined) return false;
    if (!('passage_branding' in value) || value['passage_branding'] === undefined) return false;
    if (!('profile_management' in value) || value['profile_management'] === undefined) return false;
    if (!('public_signup' in value) || value['public_signup'] === undefined) return false;
    if (!('redirect_url' in value) || value['redirect_url'] === undefined) return false;
    if (!('refresh_absolute_lifetime' in value) || value['refresh_absolute_lifetime'] === undefined) return false;
    if (!('refresh_enabled' in value) || value['refresh_enabled'] === undefined) return false;
    if (!('refresh_inactivity_lifetime' in value) || value['refresh_inactivity_lifetime'] === undefined) return false;
    if (!('require_email_verification' in value) || value['require_email_verification'] === undefined) return false;
    if (!('require_identifier_verification' in value) || value['require_identifier_verification'] === undefined) return false;
    if (!('required_identifier' in value) || value['required_identifier'] === undefined) return false;
    if (!('role' in value) || value['role'] === undefined) return false;
    if (!('rsa_public_key' in value) || value['rsa_public_key'] === undefined) return false;
    if (!('session_timeout_length' in value) || value['session_timeout_length'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('user_metadata_schema' in value) || value['user_metadata_schema'] === undefined) return false;
    if (!('technologies' in value) || value['technologies'] === undefined) return false;
    if (!('element_customization' in value) || value['element_customization'] === undefined) return false;
    if (!('element_customization_dark' in value) || value['element_customization_dark'] === undefined) return false;
    return true;
}

export function AppInfoFromJSON(json: any): AppInfo {
    return AppInfoFromJSONTyped(json, false);
}

export function AppInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppInfo {
    if (json == null) {
        return json;
    }
    return {
        
        'additional_auth_origins': json['additional_auth_origins'],
        'allowed_callback_urls': json['allowed_callback_urls'],
        'allowed_identifier': json['allowed_identifier'],
        'allowed_logout_urls': json['allowed_logout_urls'],
        'application_login_uri': json['application_login_uri'],
        'auth_fallback_method': json['auth_fallback_method'],
        'auth_fallback_method_ttl': json['auth_fallback_method_ttl'],
        'auth_methods': AuthMethodsFromJSON(json['auth_methods']),
        'auth_origin': json['auth_origin'],
        'auto_theme_enabled': json['auto_theme_enabled'],
        'created_at': (new Date(json['created_at'])),
        'default_language': json['default_language'],
        'id': json['id'],
        'layouts': LayoutsFromJSON(json['layouts']),
        'login_url': json['login_url'],
        'light_logo_url': json['light_logo_url'] == null ? undefined : json['light_logo_url'],
        'dark_logo_url': json['dark_logo_url'] == null ? undefined : json['dark_logo_url'],
        'name': json['name'],
        'hosted': json['hosted'],
        'hosted_subdomain': json['hosted_subdomain'],
        'hosted_theme': ThemeTypeFromJSON(json['hosted_theme']),
        'id_token_lifetime': json['id_token_lifetime'] == null ? undefined : json['id_token_lifetime'],
        'passage_branding': json['passage_branding'],
        'profile_management': json['profile_management'],
        'public_signup': json['public_signup'],
        'redirect_url': json['redirect_url'],
        'refresh_absolute_lifetime': json['refresh_absolute_lifetime'],
        'refresh_enabled': json['refresh_enabled'],
        'refresh_inactivity_lifetime': json['refresh_inactivity_lifetime'],
        'require_email_verification': json['require_email_verification'],
        'require_identifier_verification': json['require_identifier_verification'],
        'required_identifier': json['required_identifier'],
        'role': json['role'],
        'rsa_public_key': json['rsa_public_key'],
        'secret': json['secret'] == null ? undefined : json['secret'],
        'session_timeout_length': json['session_timeout_length'],
        'type': json['type'],
        'user_metadata_schema': ((json['user_metadata_schema'] as Array<any>).map(UserMetadataFieldFromJSON)),
        'technologies': ((json['technologies'] as Array<any>).map(TechnologiesFromJSON)),
        'element_customization': ElementCustomizationFromJSON(json['element_customization']),
        'element_customization_dark': ElementCustomizationFromJSON(json['element_customization_dark']),
    };
}

export function AppInfoToJSON(json: any): AppInfo {
    return AppInfoToJSONTyped(json, false);
}

export function AppInfoToJSONTyped(value?: AppInfo | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'additional_auth_origins': value['additional_auth_origins'],
        'allowed_callback_urls': value['allowed_callback_urls'],
        'allowed_identifier': value['allowed_identifier'],
        'allowed_logout_urls': value['allowed_logout_urls'],
        'application_login_uri': value['application_login_uri'],
        'auth_fallback_method': value['auth_fallback_method'],
        'auth_fallback_method_ttl': value['auth_fallback_method_ttl'],
        'auth_methods': AuthMethodsToJSON(value['auth_methods']),
        'auth_origin': value['auth_origin'],
        'auto_theme_enabled': value['auto_theme_enabled'],
        'created_at': ((value['created_at']).toISOString()),
        'default_language': value['default_language'],
        'id': value['id'],
        'layouts': LayoutsToJSON(value['layouts']),
        'login_url': value['login_url'],
        'light_logo_url': value['light_logo_url'],
        'dark_logo_url': value['dark_logo_url'],
        'name': value['name'],
        'hosted': value['hosted'],
        'hosted_subdomain': value['hosted_subdomain'],
        'hosted_theme': ThemeTypeToJSON(value['hosted_theme']),
        'id_token_lifetime': value['id_token_lifetime'],
        'passage_branding': value['passage_branding'],
        'profile_management': value['profile_management'],
        'public_signup': value['public_signup'],
        'redirect_url': value['redirect_url'],
        'refresh_absolute_lifetime': value['refresh_absolute_lifetime'],
        'refresh_enabled': value['refresh_enabled'],
        'refresh_inactivity_lifetime': value['refresh_inactivity_lifetime'],
        'require_email_verification': value['require_email_verification'],
        'require_identifier_verification': value['require_identifier_verification'],
        'required_identifier': value['required_identifier'],
        'role': value['role'],
        'rsa_public_key': value['rsa_public_key'],
        'secret': value['secret'],
        'session_timeout_length': value['session_timeout_length'],
        'type': value['type'],
        'user_metadata_schema': ((value['user_metadata_schema'] as Array<any>).map(UserMetadataFieldToJSON)),
        'technologies': ((value['technologies'] as Array<any>).map(TechnologiesToJSON)),
        'element_customization': ElementCustomizationToJSON(value['element_customization']),
        'element_customization_dark': ElementCustomizationToJSON(value['element_customization_dark']),
    };
}

