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
}
