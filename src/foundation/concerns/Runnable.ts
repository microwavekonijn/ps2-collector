import { Container } from 'inversify';

export default interface Runnable {
    boot?(container: Container): Promise<void>;

    start?(container: Container): Promise<void>;

    terminate?(): Promise<void>;
}

export const RUNNABLE = Symbol.for('foundation.concerns.Runnable');
