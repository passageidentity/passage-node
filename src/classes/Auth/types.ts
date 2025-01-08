import { MagicLinkChannel, MagicLinkLanguage, MagicLinkType } from '../../generated';

export { MagicLinkType, MagicLink, MagicLinkChannel, MagicLinkLanguage } from '../../generated';

type MagicLinkArgsBase = {
    type: MagicLinkType;
    send: boolean;
};

type MagicLinkWithEmailArgs = { email: string } & MagicLinkArgsBase;
type MagicLinkWithPhoneArgs = { phone: string } & MagicLinkArgsBase;
type MagicLinkWithUserArgs = { userId: string; channel: MagicLinkChannel } & MagicLinkArgsBase;

export type CreateMagicLinkArgs = MagicLinkWithEmailArgs | MagicLinkWithPhoneArgs | MagicLinkWithUserArgs;
export type MagicLinkOptions = {
    language?: MagicLinkLanguage;
    magicLinkPath?: string;
    redirectUrl?: string;
    ttl?: number;
};
