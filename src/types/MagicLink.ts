/* eslint-disable no-unused-vars */
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

export enum ChannelEnum {
  email = "email",
  phone = "phone",
}
export type ChannelType = keyof typeof ChannelEnum;

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
export type MagicLinkRequest = Partial<MagicLinkRequestProps> &
  (
    | Pick<MagicLinkRequestProps, "email">
    | Pick<MagicLinkRequestProps, "phone">
    | Pick<MagicLinkRequestProps, "user_id">
  );
