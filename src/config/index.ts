import App from './app';
import Logging from './logging';
import Census from './census';
import Collector from './collector';
import Database from './database';

/**
 * Holds the main configuration of the application
 */
export class Config {
    public readonly app = new App();
    public readonly census = new Census();
    public readonly collector = new Collector();
    public readonly database = new Database();
    public readonly logging = new Logging();
}

export default new Config();
