import { Container } from 'inversify';

export default interface Runnable {
    /**
     * Run when booting the application
     *
     * @param {Container} container
     * @return {Promise<void>}
     */
    boot?(container: Container): Promise<void>;

    /**
     * Run when starting the application
     *
     * @param {Container} container
     * @return {Promise<void>}
     */
    start?(container: Container): Promise<void>;

    /**
     * Run when terminating the application
     *
     * @return {Promise<void>}
     */
    terminate?(): Promise<void>;
}

export const RUNNABLE = Symbol.for('foundation.concerns.Runnable');
