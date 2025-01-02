import { ResponseError } from '../../generated';
import { PassageError } from '../PassageError';
import { PassageInstanceConfig } from './types';

/**
 * Base class for Passage sub-classes.
 */
export class PassageBase {
    /**
     * PassageBase class constructor.
     * @param {PassageInstanceConfig} config config properties for Passage instance
     */
    public constructor(protected readonly config: PassageInstanceConfig) {}

    /**
     * Handle errors from PassageFlex API
     * @param {unknown} err error from node-fetch request
     * @return {Promise<void>}
     */
    protected async parseError(err: unknown): Promise<Error> {
        if (err instanceof ResponseError) {
            throw await PassageError.fromResponseError(err);
        }
        return err as Error;
    }
}
