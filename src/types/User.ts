/* eslint-disable no-unused-vars */
interface UserEventInfo {
  type: string;
  timestamp: string;
  id: string;
  ip_addr: string;
  user_agent: string;
}

export interface WebAuthnDevices {
  id: string;
  cred_id: string;
  friendly_name: string;
  usage_count: number;
  updated_at: string;
  created_at: string;
  last_login_at: string;
}

enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}
type UserStatusEnum = keyof typeof UserStatus;

interface PossibleUserUpdateAttributes {
  email: string;
  phone: string;
}

type UserAttributes = Pick<PossibleUserUpdateAttributes, 'email'> | Pick<PossibleUserUpdateAttributes, 'phone'>;

export interface Metadata {
  [key: string]: boolean | string | number;
}

export interface UserObject {
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

export interface UpdateUserPayload {
  email?: string;
  phone?: string;
  user_metadata?: Metadata;
}

export interface CreateUserPayload {
  email?: string;
  phone?: string;
  user_metadata?: Metadata;
}
