import { ContainerModule } from 'inversify';
import { get, getBool } from './utils/env';

export default class App {
    /**
     * @type {string} The current environment
     */
    public readonly environment: string = get('NODE_ENV', 'developments');

    /**
     * @type {boolean} Set to true when developing the application, this will provide more information for debugging
     */
    public readonly debug: boolean = getBool('DEBUG');

    /**
     * @return {ContainerModule[]} Modules used by the app
     */
    public get modules(): ContainerModule[] {
        return [
            require('../database').default,
            require('../collector').default,
        ];
    };
}
