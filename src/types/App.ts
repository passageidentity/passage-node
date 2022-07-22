type UserMetadataFieldType = string;

type UserMetadataField = {
  handle: string;
  field_name: string;
  field_type: UserMetadataFieldType;
  friendly_name: string;
  registration: boolean;
  profile: boolean;
};

type LayoutConfig = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

type Layouts = {
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
  session_timeout_length: number;
  user_metadata_schema: Array<UserMetadataField>;
  layouts: Array<Layouts>;
}
