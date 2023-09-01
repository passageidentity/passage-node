/* eslint-disable */
export enum ChannelEnum {
    email = 'email',
    phone = 'phone',
}
export type ChannelType = keyof typeof ChannelEnum;

export type MagicLinkObject = {
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
