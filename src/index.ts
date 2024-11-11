export { Passage } from './classes/Passage/Passage';
export * from './types/AuthStrategy';
export * from './types/JWKS';
export * from './types/MagicLink';
export * from './types/PassageConfig';
export * from './types/User';
export * from './generated/models';
export * from './models';
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
    UserMetadataFieldType,
    UserMetadataField,
    WebAuthnDevices,
} from './generated';
export * from './classes/Auth';
export * from './classes/User';
export * from './classes/PassageError';
import { Passage } from './classes/Passage';
export default Passage;
