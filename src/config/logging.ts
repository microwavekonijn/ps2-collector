import { get } from './utils/env';

export default class Logging {
    /**
     * @type {string} The log level
     */
    public readonly level: string = get('LOG_LEVEL', 'info');

    /**
     * @type {string|string[]} The drivers used for logging
     */
    public readonly driver: string | string[];

    /**
     * @type {{}} Configuration for any logging driver
     */
    public readonly drivers: any = {};
}
