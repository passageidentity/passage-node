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
import type { AuthMethods } from './AuthMethods';
import {
    AuthMethodsFromJSON,
    AuthMethodsFromJSONTyped,
    AuthMethodsToJSON,
} from './AuthMethods';
import type { ElementCustomization } from './ElementCustomization';
import {
    ElementCustomizationFromJSON,
    ElementCustomizationFromJSONTyped,
    ElementCustomizationToJSON,
} from './ElementCustomization';
import type { Layouts } from './Layouts';
import {
    LayoutsFromJSON,
    LayoutsFromJSONTyped,
    LayoutsToJSON,
} from './Layouts';
import type { Technologies } from './Technologies';
import {
    TechnologiesFromJSON,
    TechnologiesFromJSONTyped,
    TechnologiesToJSON,
} from './Technologies';
import type { UserMetadataField } from './UserMetadataField';
import {
    UserMetadataFieldFromJSON,
    UserMetadataFieldFromJSONTyped,
    UserMetadataFieldToJSON,
} from './UserMetadataField';

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
     * 
     * @type {boolean}
     * @memberof AppInfo
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
     * whether or not the app's login page hosted by passage
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
export function instanceOfAppInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "additional_auth_origins" in value;
    isInstance = isInstance && "allowed_callback_urls" in value;
    isInstance = isInstance && "allowed_identifier" in value;
    isInstance = isInstance && "allowed_logout_urls" in value;
    isInstance = isInstance && "application_login_uri" in value;
    isInstance = isInstance && "auth_fallback_method" in value;
    isInstance = isInstance && "auth_fallback_method_ttl" in value;
    isInstance = isInstance && "auth_methods" in value;
    isInstance = isInstance && "auth_origin" in value;
    isInstance = isInstance && "auto_theme_enabled" in value;
    isInstance = isInstance && "created_at" in value;
    isInstance = isInstance && "default_language" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "layouts" in value;
    isInstance = isInstance && "login_url" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "hosted" in value;
    isInstance = isInstance && "hosted_subdomain" in value;
    isInstance = isInstance && "passage_branding" in value;
    isInstance = isInstance && "profile_management" in value;
    isInstance = isInstance && "public_signup" in value;
    isInstance = isInstance && "redirect_url" in value;
    isInstance = isInstance && "refresh_absolute_lifetime" in value;
    isInstance = isInstance && "refresh_enabled" in value;
    isInstance = isInstance && "refresh_inactivity_lifetime" in value;
    isInstance = isInstance && "require_email_verification" in value;
    isInstance = isInstance && "require_identifier_verification" in value;
    isInstance = isInstance && "required_identifier" in value;
    isInstance = isInstance && "role" in value;
    isInstance = isInstance && "rsa_public_key" in value;
    isInstance = isInstance && "session_timeout_length" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "user_metadata_schema" in value;
    isInstance = isInstance && "technologies" in value;
    isInstance = isInstance && "element_customization" in value;
    isInstance = isInstance && "element_customization_dark" in value;

    return isInstance;
}

export function AppInfoFromJSON(json: any): AppInfo {
    return AppInfoFromJSONTyped(json, false);
}

export function AppInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppInfo {
    if ((json === undefined) || (json === null)) {
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
        'light_logo_url': !exists(json, 'light_logo_url') ? undefined : json['light_logo_url'],
        'dark_logo_url': !exists(json, 'dark_logo_url') ? undefined : json['dark_logo_url'],
        'name': json['name'],
        'hosted': json['hosted'],
        'hosted_subdomain': json['hosted_subdomain'],
        'id_token_lifetime': !exists(json, 'id_token_lifetime') ? undefined : json['id_token_lifetime'],
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
        'secret': !exists(json, 'secret') ? undefined : json['secret'],
        'session_timeout_length': json['session_timeout_length'],
        'type': json['type'],
        'user_metadata_schema': ((json['user_metadata_schema'] as Array<any>).map(UserMetadataFieldFromJSON)),
        'technologies': ((json['technologies'] as Array<any>).map(TechnologiesFromJSON)),
        'element_customization': ElementCustomizationFromJSON(json['element_customization']),
        'element_customization_dark': ElementCustomizationFromJSON(json['element_customization_dark']),
    };
}

export function AppInfoToJSON(value?: AppInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'additional_auth_origins': value.additional_auth_origins,
        'allowed_callback_urls': value.allowed_callback_urls,
        'allowed_identifier': value.allowed_identifier,
        'allowed_logout_urls': value.allowed_logout_urls,
        'application_login_uri': value.application_login_uri,
        'auth_fallback_method': value.auth_fallback_method,
        'auth_fallback_method_ttl': value.auth_fallback_method_ttl,
        'auth_methods': AuthMethodsToJSON(value.auth_methods),
        'auth_origin': value.auth_origin,
        'auto_theme_enabled': value.auto_theme_enabled,
        'created_at': (value.created_at.toISOString()),
        'default_language': value.default_language,
        'id': value.id,
        'layouts': LayoutsToJSON(value.layouts),
        'login_url': value.login_url,
        'light_logo_url': value.light_logo_url,
        'dark_logo_url': value.dark_logo_url,
        'name': value.name,
        'hosted': value.hosted,
        'hosted_subdomain': value.hosted_subdomain,
        'id_token_lifetime': value.id_token_lifetime,
        'passage_branding': value.passage_branding,
        'profile_management': value.profile_management,
        'public_signup': value.public_signup,
        'redirect_url': value.redirect_url,
        'refresh_absolute_lifetime': value.refresh_absolute_lifetime,
        'refresh_enabled': value.refresh_enabled,
        'refresh_inactivity_lifetime': value.refresh_inactivity_lifetime,
        'require_email_verification': value.require_email_verification,
        'require_identifier_verification': value.require_identifier_verification,
        'required_identifier': value.required_identifier,
        'role': value.role,
        'rsa_public_key': value.rsa_public_key,
        'secret': value.secret,
        'session_timeout_length': value.session_timeout_length,
        'type': value.type,
        'user_metadata_schema': ((value.user_metadata_schema as Array<any>).map(UserMetadataFieldToJSON)),
        'technologies': ((value.technologies as Array<any>).map(TechnologiesToJSON)),
        'element_customization': ElementCustomizationToJSON(value.element_customization),
        'element_customization_dark': ElementCustomizationToJSON(value.element_customization_dark),
    };
}

