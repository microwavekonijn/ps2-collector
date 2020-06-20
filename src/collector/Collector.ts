import Runnable from '../foundation/concerns/Runnable';
import { Container, injectable } from 'inversify';
import { getLogger } from '../logging';
import { Db } from 'mongodb';
import PS2EventClient from '../census/PS2EventClient';

@injectable()
export default class Collector implements Runnable {
    private static readonly logger = getLogger('collector');

    /**
     * @param {PS2EventClient} client
     */
    public constructor(
        private readonly client: PS2EventClient,
    ) {}

    /**
     * Start listening to the websocket
     *
     * @param {Container} container
     * @return {Promise<void>}
     */
    public async start(container: Container): Promise<void> {
        const db = container.get(Db);

        this.client.on('raw', (payload: any) => {
            payload.recorded_at = new Date();
            db.collection(payload.event_name).insertOne(payload);
        });

        await this.client.connect();
    }

    /**
     * Terminate the websocket
     *
     * @return {Promise<void>}
     */
    public async terminate(): Promise<void> {
        Collector.logger.info('Terminating census websocket');
        this.client.destroy();
    }
}
