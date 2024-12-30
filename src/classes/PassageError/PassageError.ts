import { ResponseError } from '../../generated';

/**
 * Passage Class
 */
export class PassageError extends Error {
    public override name: 'PassageError' = 'PassageError';
    public readonly statusCode: number | undefined;
    public readonly errorCode: string | undefined;
    public readonly message: string;

    /**
     * Private constructor to be used by the async fromResponseError method.
     * @param {string} message error message
     * @param {string} errorCode  error code
     * @param {ResponseError} err ResponseError
     */
    private constructor(message: string, errorCode: string, err: ResponseError) {
        super();

        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = err.response.status;
    }

    /**
     * Maps a ResponseError to a PassageError.
     * @param {error} err ResponseError
     * @param {string} message Optional message to prefix the error message
     * @return {PassageError} PassageError
     */
    public static async fromResponseError(err: ResponseError): Promise<PassageError> {
        const response: { code: string; error: string } = await err.response.json();
        return new PassageError(response.error, response.code, err);
    }
}
