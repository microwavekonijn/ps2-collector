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

        this.client.on('event', (event) => {
            db.collection(event.event_name).insertOne({recorded_at: new Date(), ...event});
        });

        this.client.on('duplicate', (event) => {
            db.collection(event.event_name).insertOne({recorded_at: new Date(), marked_duplicate: true, ...event});

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
