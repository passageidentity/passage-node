import {
    createRemoteJWKSet,
    decodeProtectedHeader,
    FlattenedJWSInput,
    JWSHeaderParameters,
    jwtVerify,
    KeyLike,
} from 'jose';
import { PassageBase, PassageInstanceConfig } from '../PassageBase';
import { PassageError } from '../PassageError';
import { MagicLink, MagicLinksApi } from '../../generated';
import { CreateMagicLinkArgs, MagicLinkOptions } from './types';

/**
 * Auth class that provides methods for validating JWTs and creating Magic Links.
 */
export class Auth extends PassageBase {
    private readonly jwks: (protectedHeader?: JWSHeaderParameters, token?: FlattenedJWSInput) => Promise<KeyLike>;

    /**
     * Auth class constructor.
     * @param {PassageInstanceConfig} config config properties for Passage instance
     */
    public constructor(protected config: PassageInstanceConfig) {
        super(config);
        this.jwks = createRemoteJWKSet(
            new URL(`https://auth.passage.id/v1/apps/${this.config.appId}/.well-known/jwks.json`),
            {
                cacheMaxAge: 1000 * 60 * 60 * 24, // 24 hours
            },
        );
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

        try {
            const { kid } = decodeProtectedHeader(jwt);
            if (!kid) {
                throw new PassageError('Could not find valid cookie for authentication. You must catch this error.');
            }

            const {
                payload: { sub: userId, aud },
            } = await jwtVerify(jwt, this.jwks);

            if (!userId) {
                throw new PassageError('Could not validate auth token. You must catch this error.');
            }
            if (Array.isArray(aud)) {
                if (!aud.includes(this.config.appId)) {
                    throw new Error('Incorrect app ID claim in token. You must catch this error.');
                }
            }
            return userId;
        } catch (e) {
            if (e instanceof Error) {
                throw new PassageError(`Could not verify token: ${e.toString()}. You must catch this error.`);
            }

            throw new PassageError(`Could not verify token. You must catch this error.`);
        }
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
            const magicLinksApi = new MagicLinksApi(this.config.apiConfiguration);
            const { language, magicLinkPath, redirectUrl, ttl } = options ?? {};
            const response = await magicLinksApi.createMagicLink({
                appId: this.config.appId,
                createMagicLinkRequest: {
                    ...args,
                    language,
                    magic_link_path: magicLinkPath,
                    redirect_url: redirectUrl,
                    ttl,
                },
            });

            return response.magic_link;
        } catch (err) {
            throw await this.parseError(err, 'Could not create a magic link for this app');
        }
    }
}
