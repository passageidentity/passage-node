import { ResponseError } from '../generated';

/**
 * Passage Class
 */
export class PassageError extends Error {
    readonly statusCode: number | undefined;
    readonly error: string | undefined;
    readonly message: string;

    /**
     * Initialize a new PassageError instance.
     * @param {string} message friendly message,
     * @param {Error} err error from node-fetch request
     */
    constructor(message: string, err?: ResponseError) {
        super();

        if (err) {
            this.message = `${message}: ${err.message}`;
            this.statusCode = 500;
            this.error = err.message;
        } else {
            this.message = message;
        }
    }
}
