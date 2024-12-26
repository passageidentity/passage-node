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
    additionalAuthOrigins: Array<string>;
    /**
     * The valid URLs where users can be redirected after authentication.
     * @type {Array<string>}
     * @memberof AppInfo
     */
    allowedCallbackUrls: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    allowedIdentifier: string;
    /**
     * The valid URLs where users can be redirected after logging out.
     * @type {Array<string>}
     * @memberof AppInfo
     */
    allowedLogoutUrls: Array<string>;
    /**
     * A route within your application that redirects to the Authorization URL endpoint.
     * @type {string}
     * @memberof AppInfo
     */
    applicationLoginUri: string;
    /**
     * Deprecated Property. Please refer to `auth_methods` to view settings for individual authentication methods.
     * @type {string}
     * @memberof AppInfo
     * @deprecated
     */
    authFallbackMethod: string;
    /**
     * Deprecated Property. Please refer to `auth_methods` to view settings for individual authentication methods.
     * @type {number}
     * @memberof AppInfo
     * @deprecated
     */
    authFallbackMethodTtl: number;
    /**
     * 
     * @type {AuthMethods}
     * @memberof AppInfo
     */
    authMethods: AuthMethods;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    authOrigin: string;
    /**
     * Deprecated Property. Please use `hosted_theme` to set hosted page theming instead.
     * @type {boolean}
     * @memberof AppInfo
     * @deprecated
     */
    autoThemeEnabled: boolean;
    /**
     * 
     * @type {Date}
     * @memberof AppInfo
     */
    createdAt: Date;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    defaultLanguage: string;
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
    loginUrl: string;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    lightLogoUrl?: string;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    darkLogoUrl?: string;
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
    hostedSubdomain: string;
    /**
     * 
     * @type {ThemeType}
     * @memberof AppInfo
     */
    hostedTheme: ThemeType;
    /**
     * 
     * @type {number}
     * @memberof AppInfo
     */
    idTokenLifetime?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AppInfo
     */
    passageBranding: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AppInfo
     */
    profileManagement: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AppInfo
     */
    publicSignup: boolean;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    redirectUrl: string;
    /**
     * 
     * @type {number}
     * @memberof AppInfo
     */
    refreshAbsoluteLifetime: number;
    /**
     * 
     * @type {boolean}
     * @memberof AppInfo
     */
    refreshEnabled: boolean;
    /**
     * 
     * @type {number}
     * @memberof AppInfo
     */
    refreshInactivityLifetime: number;
    /**
     * 
     * @type {boolean}
     * @memberof AppInfo
     */
    requireEmailVerification: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AppInfo
     */
    requireIdentifierVerification: boolean;
    /**
     * 
     * @type {string}
     * @memberof AppInfo
     */
    requiredIdentifier: string;
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
    rsaPublicKey: string;
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
    sessionTimeoutLength: number;
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
    userMetadataSchema: Array<UserMetadataField>;
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
    elementCustomization: ElementCustomization;
    /**
     * 
     * @type {ElementCustomization}
     * @memberof AppInfo
     */
    elementCustomizationDark: ElementCustomization;
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
    if (!('additionalAuthOrigins' in value) || value['additionalAuthOrigins'] === undefined) return false;
    if (!('allowedCallbackUrls' in value) || value['allowedCallbackUrls'] === undefined) return false;
    if (!('allowedIdentifier' in value) || value['allowedIdentifier'] === undefined) return false;
    if (!('allowedLogoutUrls' in value) || value['allowedLogoutUrls'] === undefined) return false;
    if (!('applicationLoginUri' in value) || value['applicationLoginUri'] === undefined) return false;
    if (!('authFallbackMethod' in value) || value['authFallbackMethod'] === undefined) return false;
    if (!('authFallbackMethodTtl' in value) || value['authFallbackMethodTtl'] === undefined) return false;
    if (!('authMethods' in value) || value['authMethods'] === undefined) return false;
    if (!('authOrigin' in value) || value['authOrigin'] === undefined) return false;
    if (!('autoThemeEnabled' in value) || value['autoThemeEnabled'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('defaultLanguage' in value) || value['defaultLanguage'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('layouts' in value) || value['layouts'] === undefined) return false;
    if (!('loginUrl' in value) || value['loginUrl'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('hosted' in value) || value['hosted'] === undefined) return false;
    if (!('hostedSubdomain' in value) || value['hostedSubdomain'] === undefined) return false;
    if (!('hostedTheme' in value) || value['hostedTheme'] === undefined) return false;
    if (!('passageBranding' in value) || value['passageBranding'] === undefined) return false;
    if (!('profileManagement' in value) || value['profileManagement'] === undefined) return false;
    if (!('publicSignup' in value) || value['publicSignup'] === undefined) return false;
    if (!('redirectUrl' in value) || value['redirectUrl'] === undefined) return false;
    if (!('refreshAbsoluteLifetime' in value) || value['refreshAbsoluteLifetime'] === undefined) return false;
    if (!('refreshEnabled' in value) || value['refreshEnabled'] === undefined) return false;
    if (!('refreshInactivityLifetime' in value) || value['refreshInactivityLifetime'] === undefined) return false;
    if (!('requireEmailVerification' in value) || value['requireEmailVerification'] === undefined) return false;
    if (!('requireIdentifierVerification' in value) || value['requireIdentifierVerification'] === undefined) return false;
    if (!('requiredIdentifier' in value) || value['requiredIdentifier'] === undefined) return false;
    if (!('role' in value) || value['role'] === undefined) return false;
    if (!('rsaPublicKey' in value) || value['rsaPublicKey'] === undefined) return false;
    if (!('sessionTimeoutLength' in value) || value['sessionTimeoutLength'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('userMetadataSchema' in value) || value['userMetadataSchema'] === undefined) return false;
    if (!('technologies' in value) || value['technologies'] === undefined) return false;
    if (!('elementCustomization' in value) || value['elementCustomization'] === undefined) return false;
    if (!('elementCustomizationDark' in value) || value['elementCustomizationDark'] === undefined) return false;
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
        
        'additionalAuthOrigins': json['additional_auth_origins'],
        'allowedCallbackUrls': json['allowed_callback_urls'],
        'allowedIdentifier': json['allowed_identifier'],
        'allowedLogoutUrls': json['allowed_logout_urls'],
        'applicationLoginUri': json['application_login_uri'],
        'authFallbackMethod': json['auth_fallback_method'],
        'authFallbackMethodTtl': json['auth_fallback_method_ttl'],
        'authMethods': AuthMethodsFromJSON(json['auth_methods']),
        'authOrigin': json['auth_origin'],
        'autoThemeEnabled': json['auto_theme_enabled'],
        'createdAt': (new Date(json['created_at'])),
        'defaultLanguage': json['default_language'],
        'id': json['id'],
        'layouts': LayoutsFromJSON(json['layouts']),
        'loginUrl': json['login_url'],
        'lightLogoUrl': json['light_logo_url'] == null ? undefined : json['light_logo_url'],
        'darkLogoUrl': json['dark_logo_url'] == null ? undefined : json['dark_logo_url'],
        'name': json['name'],
        'hosted': json['hosted'],
        'hostedSubdomain': json['hosted_subdomain'],
        'hostedTheme': ThemeTypeFromJSON(json['hosted_theme']),
        'idTokenLifetime': json['id_token_lifetime'] == null ? undefined : json['id_token_lifetime'],
        'passageBranding': json['passage_branding'],
        'profileManagement': json['profile_management'],
        'publicSignup': json['public_signup'],
        'redirectUrl': json['redirect_url'],
        'refreshAbsoluteLifetime': json['refresh_absolute_lifetime'],
        'refreshEnabled': json['refresh_enabled'],
        'refreshInactivityLifetime': json['refresh_inactivity_lifetime'],
        'requireEmailVerification': json['require_email_verification'],
        'requireIdentifierVerification': json['require_identifier_verification'],
        'requiredIdentifier': json['required_identifier'],
        'role': json['role'],
        'rsaPublicKey': json['rsa_public_key'],
        'secret': json['secret'] == null ? undefined : json['secret'],
        'sessionTimeoutLength': json['session_timeout_length'],
        'type': json['type'],
        'userMetadataSchema': ((json['user_metadata_schema'] as Array<any>).map(UserMetadataFieldFromJSON)),
        'technologies': ((json['technologies'] as Array<any>).map(TechnologiesFromJSON)),
        'elementCustomization': ElementCustomizationFromJSON(json['element_customization']),
        'elementCustomizationDark': ElementCustomizationFromJSON(json['element_customization_dark']),
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
        
        'additional_auth_origins': value['additionalAuthOrigins'],
        'allowed_callback_urls': value['allowedCallbackUrls'],
        'allowed_identifier': value['allowedIdentifier'],
        'allowed_logout_urls': value['allowedLogoutUrls'],
        'application_login_uri': value['applicationLoginUri'],
        'auth_fallback_method': value['authFallbackMethod'],
        'auth_fallback_method_ttl': value['authFallbackMethodTtl'],
        'auth_methods': AuthMethodsToJSON(value['authMethods']),
        'auth_origin': value['authOrigin'],
        'auto_theme_enabled': value['autoThemeEnabled'],
        'created_at': ((value['createdAt']).toISOString()),
        'default_language': value['defaultLanguage'],
        'id': value['id'],
        'layouts': LayoutsToJSON(value['layouts']),
        'login_url': value['loginUrl'],
        'light_logo_url': value['lightLogoUrl'],
        'dark_logo_url': value['darkLogoUrl'],
        'name': value['name'],
        'hosted': value['hosted'],
        'hosted_subdomain': value['hostedSubdomain'],
        'hosted_theme': ThemeTypeToJSON(value['hostedTheme']),
        'id_token_lifetime': value['idTokenLifetime'],
        'passage_branding': value['passageBranding'],
        'profile_management': value['profileManagement'],
        'public_signup': value['publicSignup'],
        'redirect_url': value['redirectUrl'],
        'refresh_absolute_lifetime': value['refreshAbsoluteLifetime'],
        'refresh_enabled': value['refreshEnabled'],
        'refresh_inactivity_lifetime': value['refreshInactivityLifetime'],
        'require_email_verification': value['requireEmailVerification'],
        'require_identifier_verification': value['requireIdentifierVerification'],
        'required_identifier': value['requiredIdentifier'],
        'role': value['role'],
        'rsa_public_key': value['rsaPublicKey'],
        'secret': value['secret'],
        'session_timeout_length': value['sessionTimeoutLength'],
        'type': value['type'],
        'user_metadata_schema': ((value['userMetadataSchema'] as Array<any>).map(UserMetadataFieldToJSON)),
        'technologies': ((value['technologies'] as Array<any>).map(TechnologiesToJSON)),
        'element_customization': ElementCustomizationToJSON(value['elementCustomization']),
        'element_customization_dark': ElementCustomizationToJSON(value['elementCustomizationDark']),
    };
}

