import Passage from './classes/Passage';
export * from './types/AuthStrategy';
export * from './types/JWKS';
export * from './types/MagicLink';
export * from './types/PassageConfig';
export * from './types/User';
export * from './generated/models';
export {
    AppInfo as AppObject,
    CreateUserRequest as CreateUserPayload,
    CreateMagicLinkRequest as MagicLinkRequestProps,
    MagicLinkType as MagicLinkEnum,
    MagicLinkType,
    MagicLink as MagicLinkObject,
    UpdateUserRequest as UpdateUserPayload,
    UserInfo as UserObject,
    Layouts,
    LayoutConfig,
    ResponseError,
    UserEventInfo,
    UserMetadataFieldType,
    UserMetadataField,
    WebAuthnDevices,
} from './generated';

module.exports = Passage;

export default Passage;
