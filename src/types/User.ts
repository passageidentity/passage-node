/* eslint-disable */
enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    PENDING = 'pending',
}
export type UserStatusEnum = keyof typeof UserStatus;

export interface PossibleUserUpdateAttributes {
    email: string;
    phone: string;
}

export type UserAttributes = Pick<PossibleUserUpdateAttributes, 'email'> | Pick<PossibleUserUpdateAttributes, 'phone'>;

export interface Metadata {
    [key: string]: boolean | string | number;
}
