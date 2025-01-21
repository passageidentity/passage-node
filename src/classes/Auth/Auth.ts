import {
    createRemoteJWKSet,
    decodeProtectedHeader,
    FlattenedJWSInput,
    JWSHeaderParameters,
    jwtVerify,
    KeyLike,
} from 'jose';
import { PassageBase, PassageInstanceConfig } from '../PassageBase';
import { MagicLink, MagicLinkChannel, MagicLinksApi } from '../../generated';
import { CreateMagicLinkArgs, MagicLinkOptions } from './types';

/**
 * auth class that provides methods for validating JWTs and creating Magic Links.
 */
export class Auth extends PassageBase {
    private readonly jwks: (protectedHeader?: JWSHeaderParameters, token?: FlattenedJWSInput) => Promise<KeyLike>;
    private readonly magicLinksApi: MagicLinksApi;

    /**
     * Auth class constructor.
     * @param {PassageInstanceConfig} config config properties for Passage instance
     */
    public constructor(config: PassageInstanceConfig) {
        super(config);
        this.jwks = createRemoteJWKSet(
            new URL(`https://auth.passage.id/v1/apps/${this.config.appId}/.well-known/jwks.json`),
            {
                cacheMaxAge: 1000 * 60 * 60 * 24, // 24 hours
            },
        );

        this.magicLinksApi = new MagicLinksApi(this.config.apiConfiguration);
    }

    /**
     * Validate that a JWT is valid and return the Passage user ID associated with the token.
     *
     * @param {string} jwt The authentication token to be validated
     * @return {string} User ID of the Passage user
     */
    public async validateJwt(jwt: string): Promise<string> {
        if (!jwt) {
            throw new Error('jwt is required.');
        }

        const { kid } = decodeProtectedHeader(jwt);
        if (!kid) {
            throw new Error('kid missing in jwt header.');
        }

        const {
            payload: { sub: userId },
        } = await jwtVerify(jwt, this.jwks, { audience: [this.config.appId] });

        if (!userId) {
            throw new Error('sub missing in jwt claims.');
        }

        return userId;
    }

    /**
     * Create a Magic Link for your app.
     *
     * @param {CreateMagicLinkArgs} args options for creating a MagicLink.
     * @param {MagicLinkOptions} options options for creating a MagicLink.
     * @return {Promise<MagicLink>} Passage MagicLink object
     */
    public async createMagicLink(args: CreateMagicLinkArgs, options?: MagicLinkOptions): Promise<MagicLink> {
        try {
            const { language, magicLinkPath, redirectUrl, ttl } = options ?? {};

            let channel: MagicLinkChannel;
            if ('userId' in args) {
                channel = args.channel;
            } else if ('email' in args) {
                channel = MagicLinkChannel.Email;
            } else {
                channel = MagicLinkChannel.Phone;
            }

            const response = await this.magicLinksApi.createMagicLink({
                appId: this.config.appId,
                createMagicLinkRequest: {
                    ...args,
                    channel,
                    language,
                    magicLinkPath,
                    redirectUrl,
                    ttl,
                },
            });

            return response.magicLink;
        } catch (err) {
            throw await this.parseError(err);
        }
    }
}
