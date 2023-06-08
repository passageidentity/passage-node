export type UserMetadataFieldType = string;

export type UserMetadataField = {
    handle: string;
    field_name: string;
    field_type: UserMetadataFieldType;
    friendly_name: string;
    registration: boolean;
    profile: boolean;
};

export type LayoutConfig = {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
};

export type Layouts = {
    registration: Array<LayoutConfig>;
    profile: Array<LayoutConfig>;
};

export interface AppObject {
    name: string;
    id: string;
    auth_origin: string;
    redirect_url: string;
    login_url: string;
    rsa_public_key: string;
    allowed_identifier: string;
    require_identifier_verification: boolean;
    refresh_enabled: boolean;
    session_timeout_length: number;
    refresh_absolute_lifetime: number;
    refresh_inactivity_lifetime: number;
    user_metadata_schema: Array<UserMetadataField>;
    layouts: Array<Layouts>;
    default_language: string;
    auth_fallback_method: string;
    auth_fallback_method_ttl: number;
}
