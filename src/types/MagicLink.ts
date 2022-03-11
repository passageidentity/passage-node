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
  ttl: number;
};

enum ChannelEnum {
  email = "email",
  phone = "phone",
}
export type ChannelType = keyof typeof ChannelEnum;

export type MagicLinkRequest = {
  user_id: string;
  email: string;
  phone: string;
  channel: ChannelEnum;
  send: boolean;
  magic_link_path: string;
  redirect_url: string;
  ttl: number;
};
