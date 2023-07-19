import { FetchError } from 'node-fetch';

/**
 * Check if Error looks like FetchError.
 * @param {Error} e the error
 * @return {boolean} whether it looks like an FetchError
 */
function isFetchError(e: Error): boolean {
    return (e as FetchError)?.name === 'FetchError';
}

/**
 * Passage Class
 */
export class PassageError extends Error {
    readonly statusCode: number | undefined;
    readonly statusText: string | undefined;
    readonly error: string | undefined;
    readonly message: string;

    /**
     * Initialize a new PassageError instance.
     * @param {string} message friendly message,
     * @param {Error} err error from node-fetch request
     */
    constructor(message: string, err?: FetchError) {
        super();

        this.message = message;

        if (err && isFetchError(err)) {
            this.statusCode = err?.code ? parseInt(err?.code) : 500;
            this.statusText = err.name;
            this.error = err.message;
        } else {
            this.error = err?.message;
        }
    }
}
