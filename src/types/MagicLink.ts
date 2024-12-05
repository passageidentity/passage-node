/* eslint-disable */
export enum ChannelEnum {
    email = 'email',
    phone = 'phone',
}
export type ChannelType = keyof typeof ChannelEnum;
