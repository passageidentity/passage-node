import {
    UserInfo,
    CreateUserRequest,
    UpdateUserRequest,
    WebAuthnDevices,
    WebAuthnType,
    WebAuthnIcons,
    UserRecentEvent,
    UserSocialConnections,
    UserStatus,
} from '../../generated';

export type PassageUser = UserInfo;
export type CreateUserArgs = CreateUserRequest;
export type CreateUserPayload = CreateUserRequest;
export type UpdateUserArgs = UpdateUserRequest;
export {
    CreateUserRequest,
    UpdateUserRequest,
    UserInfo,
    WebAuthnDevices,
    WebAuthnType,
    WebAuthnIcons,
    UserRecentEvent,
    UserSocialConnections,
    UserStatus,
};
