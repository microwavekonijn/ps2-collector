import App from './app';
import Logging from "./logging";

/**
 * Holds the main configuration of the application
 */
export class Config {
    public readonly app = new App();
    public readonly logging = new Logging();
}

export default new Config();

