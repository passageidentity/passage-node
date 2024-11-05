import { ResponseError } from '../../generated';

/**
 * Passage Class
 */
export class PassageError extends Error {
    override name: 'PassageError' = 'PassageError';
    readonly statusCode: number | undefined;
    readonly errorCode: string | undefined;
    readonly message: string;

    /** @deprecated use errorCode instead */
    readonly error: string | undefined;

    /**
     * Initialize a new PassageError instance.
     * @param {string} message friendly error message
     * @param {string} errorCode error code from Passage Backend
     * @param {ResponseError} err error from http request
     */
    constructor(message: string, errorCode?: string, err?: ResponseError) {
        super();

        this.message = message;
        this.errorCode = errorCode;

        if (err) {
            this.statusCode = err.response.status;
            this.error = err.message;
        }
    }

    /**
     * Maps a ResponseError to a PassageError.
     * @param {error} err ResponseError
     * @param {string} message ResponseError
     * @return {PassageError} PassageError
     */
    public static async fromResponseError(err: ResponseError, message?: string): Promise<PassageError> {
        const response: { code: string; error: string } = await err.response.json();
        return new PassageError(`${message}: ${response.error}`, response.code, err);
    }
}
