import { createRemoteJWKSet, decodeProtectedHeader, FlattenedJWSInput, JWSHeaderParameters, jwtVerify, KeyLike } from "jose";
import { PassageBase, PassageInstanceConfig } from "../PassageBase";
import { PassageError } from "../PassageError";
import { CreateMagicLinkRequest, MagicLink, MagicLinksApi, ResponseError } from "../../generated";

export class Auth extends PassageBase {
    private jwks: (protectedHeader?: JWSHeaderParameters, token?: FlattenedJWSInput) => Promise<KeyLike>;

    constructor(protected config: PassageInstanceConfig) {
        super(config);
        this.jwks = createRemoteJWKSet(new URL(`https://auth.passage.id/v1/apps/${this.config.appId}/.well-known/jwks.json`), {
            cacheMaxAge: 1000 * 60 * 60 * 24, // 24 hours
        });
    }

    /**
     * Validate that a JWT is valid and return the Passage user ID associated with the token.
     *
     * @param {string} jwt The authentication token to be validated
     * @return {string} User ID of the Passage user
     */
    public async validateJwt(jwt: string): Promise<string> {
        try {
            const { kid } = decodeProtectedHeader(jwt);
            if (!kid) {
                throw new PassageError('Could not find valid cookie for authentication.');
            }

            const {
                payload: { sub: userId },
            } = await jwtVerify(jwt, this.jwks);

            if (!userId){
                throw new PassageError('Could not validate auth token.');
            }
            return userId;
        } catch (e) {
            if (e instanceof Error)
                throw new PassageError(`Could not verify token: ${e.toString()}.`);

            throw new PassageError(`Could not verify token.`);
        }
    }

    /**
     * Create a Magic Link for your app.
     *
     * @param {MagicLinkRequest} magicLinkReq options for creating a MagicLink.
     * @return {Promise<MagicLink>} Passage MagicLink object
     */
    public async createMagicLink(magicLinkReq: CreateMagicLinkRequest): Promise<MagicLink> {
        try {
            const magicLinksApi = new MagicLinksApi(this.config.apiConfiguration);
            const response = await magicLinksApi.createMagicLink({
                appId: this.config.appId,
                createMagicLinkRequest: magicLinkReq,
            });

            return response.magic_link;
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError(err, 'Could not create a magic link for this app');
            }

            throw err;
        }
    }
}