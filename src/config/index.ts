import App from './app';
import Logging from './logging';
import Census from './census';

/**
 * Holds the main configuration of the application
 */
export class Config {
    public readonly app = new App();
    public readonly census = new Census();
    public readonly logging = new Logging();
}

export default new Config();
