import { PassageInstanceConfig } from './types';

/**
 * Base class for Passage sub-classes.
 */
export class PassageBase {
    /**
     * PassageBase class constructor.
     * @param {PassageInstanceConfig} config config properties for Passage instance
     */
    constructor(protected config: PassageInstanceConfig) {}
}
