import { ResponseError } from '../generated';

/**
 * Passage Class
 */
export class PassageError extends Error {
    override name: 'PassageError' = 'PassageError';
    readonly statusCode: number | undefined;
    readonly error: string | undefined;
    readonly message: string;

    /**
     * Initialize a new PassageError instance.
     * @param {string} message friendly message
     * @param {ResponseError} err error from http request
     */
    constructor(message: string, err?: ResponseError) {
        super();

        if (err) {
            this.message = message;
            this.statusCode = 500;
            this.error = err.message;
        } else {
            this.message = message;
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
        return new PassageError(`${message}: ${response.error}`, err);
    }
}
