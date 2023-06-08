import { AxiosError } from 'axios';

/**
 * Check if Error looks like AxiosError.
 * @param {Error} e the error
 * @return {boolean} whether it looks like an AxiosError
 */
function isAxiosError(e: Error): e is AxiosError {
    return (e as AxiosError).isAxiosError === true;
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
     * @param {Error} err error from axios request
     */
    constructor(message: string, err?: Error) {
        super();

        this.message = message;
        if (err && isAxiosError(err)) {
            this.statusCode = err.response?.status;
            this.statusText = err.response?.statusText;
            this.error = err.response?.data.error;
        } else {
            this.error = err?.message;
        }
    }
}
