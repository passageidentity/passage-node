import { Request } from "express-serve-static-core";

declare enum AuthStrategyEnum {
  COOKIE = "COOKIE",
  HEADER = "HEADER",
}
type AuthStrategy = keyof typeof AuthStrategyEnum;

type MagicLinkObject = {
  id: string;
  secret: string;
  activated: boolean;
  user_id: string;
  app_id: string;
  identifier: string;
  type: string;
  redirect_url: string;
  url: string;
};
declare enum ChannelEnum {
  email = "email",
  phone = "phone",
}
type ChannelType = keyof typeof ChannelEnum;
interface MagicLinkRequestProps {
  user_id: string;
  email: string;
  phone: string;
  send: boolean;
  channel: ChannelType;
  magic_link_path: string;
  redirect_url: string;
  language: string;
  ttl: number;
}
/** MagicLinkRequest must contain at least one of an email, phone, or user_id property. Note, if you set a value for the send property you must also set a value for the channel.*/
type MagicLinkRequest = Partial<MagicLinkRequestProps> &
  (
    | Pick<MagicLinkRequestProps, "email">
    | Pick<MagicLinkRequestProps, "phone">
    | Pick<MagicLinkRequestProps, "user_id">
  );

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
interface AppObject {
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

type PassageConfig = {
  appID: string;
  apiKey?: string;
  authStrategy?: AuthStrategy;
  failureRedirect?: string;
};

interface UserEventInfo {
  type: string;
  timestamp: string;
  id: string;
  ip_addr: string;
  user_agent: string;
}
interface WebAuthnDevices {
  id: string;
  cred_id: string;
  friendly_name: string;
  usage_count: number;
  updated_at: string;
  created_at: string;
  last_login_at: string;
}
declare enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
}
type UserStatusEnum = keyof typeof UserStatus;
interface Metadata {
  [key: string]: boolean | string | number;
}
interface UserObject {
  created_at: string;
  updated_at: string;
  status: UserStatusEnum;
  email_verified: boolean;
  phone_verified: boolean;
  email: string;
  phone: string;
  id: string;
  last_login_at: string;
  login_count: number;
  recent_events: Array<UserEventInfo>;
  webauthn: boolean;
  webauthn_devices: Array<WebAuthnDevices>;
  user_metadata?: Metadata;
}
interface UpdateUserPayload {
  email?: string;
  phone?: string;
  user_metadata?: Metadata;
}
interface CreateUserPayload {
  email?: string;
  phone?: string;
  user_metadata?: Metadata;
}
/***/
declare class User {
  #private;
  id: string;
  /**
   * Initialize a new Passage User instance.
   *
   * @param {PassageConfig} config The default config for Passage and User initialization
   */
  constructor(config: PassageConfig);
  /**
   * Get a user's object using their user ID.
   *
   * @param {string} userID The Passage user ID
   * @return {Promise<UserObject>} Passage User object
   */
  get(userID: string): Promise<UserObject>;
  /**
   * Deactivate a user using their user ID.
   *
   * @param {string} userID The Passage user ID
   * @return {Promise<UserObject>} Passage User object
   */
  deactivate(userID: string): Promise<UserObject>;
  /**
   * Update a user.
   *
   * @param {string} userID The passage user ID
   * @param {UpdateUserPayload} payload The user attributes to be updated
   * @return {Promise<UserObject>} Pasasge User Object
   */
  update(userID: string, payload: UpdateUserPayload): Promise<UserObject>;
  /**
   * Activate a user using their user ID.
   *
   * @param {string} userID The passage user ID
   * @return {Promise<UserObject>} Passage User object
   */
  activate(userID: string): Promise<UserObject>;
  /**
   * Create a user.
   *
   * @param {CreateUserPayload} payload To create the user.
   * @return {Promise<UserObject>} Passage User object
   */
  create(payload: CreateUserPayload): Promise<UserObject>;
  /**
   * Delete a user using their user ID.
   *
   * @param {string} userID The userID used to delete the corresponding user.
   * Either an E164 phone number or email address.
   * @return {boolean} True if user was deleted, false if not
   */
  delete(userID: string): Promise<boolean>;
  /**
   * Get a user's devices using their user ID.
   *
   * @param {string} userID The Passage user ID
   * @return {Promise<Array<WebAuthnDevices>>} List of devices
   */
  listDevices(userID: string): Promise<Array<WebAuthnDevices>>;
  /**
   * Revoke a user's device using their user ID and the device ID.
   *
   * @param {string} userID The Passage user ID
   * @param {string} deviceID The Passage user's device ID
   * @return {Promise<boolean>}
   */
  revokeDevice(userID: string, deviceID: string): Promise<boolean>;
  /**
   * Revokes all of a user's Refresh Tokens using their User ID.
   *
   * @param {string} userID The Passage user ID
   * @return {Promise<boolean>}
   */
  signOut(userID: string): Promise<boolean>;
}

interface JWKS {
  [kid: string]: JWK;
}
interface JWK {
  alg: Algorithm;
  kty: string;
  use: string;
  n: string;
  e: string;
  kid: string;
}

/**
 * Passage Class
 */
declare class Passage {
  #private;
  appID: string;
  authStrategy: AuthStrategy;
  user: User;
  /**
   * Initialize a new Passage instance.
   * @param {PassageConfig} config The default config for Passage initialization
   */
  constructor(config?: PassageConfig);
  /**
   * Authenticate request with a cookie, or header. If no authentication
   * strategy is given, authenticate the request via cookie (default
   * authentication strategy).
   *
   * @param {Request} req Express request
   * @return {string} UserID of the Passage user
   */
  authenticateRequest(req: Request): Promise<string>;
  /**
   * Set API key for this Passage instance
   * @param {string} _apiKey
   */
  set apiKey(_apiKey: string | undefined);
  /**
   * Get API key for this Passage instance
   * @return {string | undefined} Passage API Key
   */
  get apiKey(): string | undefined;
  /**
   * Fetch the corresponding JWKS for this app.
   *
   * @param {boolean} resetCache Optional value to specify whether or not the cache should be reset
   * @return {JWKS} JWKS for this app.
   */
  fetchJWKS(resetCache?: boolean): Promise<JWKS>;
  /**
   * Authenticate a request via the http header.
   *
   * @param {Request} req Express request
   * @return {string} User ID for Passage User
   */
  authenticateRequestWithHeader(req: Request): Promise<string>;
  /**
   * Authenticate request via cookie.
   *
   * @param {Request} req Express request
   * @return {string} UserID for Passage User
   */
  authenticateRequestWithCookie(req: Request): Promise<string>;
  /**
   *
   * @param {string} kid the KID from the authToken to determine which JWK to use.
   * @return {Promise<JWK | undefined>} the JWK to be used for decoding an authToken with the associated KID.
   */
  private _findJWK;
  /**
   * Determine if the provided token is valid when compared with its
   * respective public key.
   *
   * @param {string} token Authentication token
   * @return {string} sub claim if the jwt can be verified, or undefined
   */
  validAuthToken(token: string): Promise<string | undefined>;
  /**
   * Create a Magic Link for your app.
   *
   * @param {MagicLinkRequest} magicLinkReq options for creating a MagicLink.
   * @return {Promise<MagicLinkObject>} Passage MagicLink object
   */
  createMagicLink(magicLinkReq: MagicLinkRequest): Promise<MagicLinkObject>;
  /**
   * Get App Info about an app
   *
   * @return {Promise<AppObject>} Passage App object
   */
  getApp(): Promise<AppObject>;
}

export { Passage as default };
