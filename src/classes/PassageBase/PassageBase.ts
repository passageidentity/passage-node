import { PassageError, ResponseError } from '../PassageError';
import { PassageInstanceConfig } from './types';

/**
 * Base class for Passage sub-classes.
 */
export class PassageBase {
    /**
     * PassageBase class constructor.
     * @param {PassageInstanceConfig} config config properties for Passage instance
     */
    public constructor(protected config: PassageInstanceConfig) {}

    /**
     * Handle errors from PassageFlex API
     * @param {unknown} err error from node-fetch request
     * @param {string} message optional message to include in the error
     * @return {Promise<void>}
     */
    protected async parseError(err: unknown, message?: string): Promise<Error> {
        if (err instanceof ResponseError) {
            throw await PassageError.fromResponseError(err, message);
        }
        return err as Error;
    }
}
