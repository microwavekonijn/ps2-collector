import Runnable from '../foundation/concerns/Runnable';
import { Container, inject, injectable } from 'inversify';
import WebSocket, { Data } from 'ws';
import { getLogger } from '../logging';
import config from '../config';
import { Db } from 'mongodb';

@injectable()
export default class Collector implements Runnable {
    private static readonly logger = getLogger('collector');

    /**
     * Database used for storage
     */
    private db: Db;

    /**
     * @param {WebSocket} census
     */
    public constructor(
        @inject('ps2ws') private readonly census: WebSocket,
    ) {}

    /**
     * Start listening to the websocket
     *
     * @param {Container} container
     * @return {Promise<void>}
     */
    public async start(container: Container): Promise<void> {
        this.db = container.get(Db);

        this.census.on('open', this.onOpen.bind(this));
        this.census.on('message', this.onMessage.bind(this));
    }

    /**
     * Terminate the websocket
     *
     * @return {Promise<void>}
     */
    public async terminate(): Promise<void> {
        Collector.logger.info('Terminating census websocket');
        this.census.close();
    }

    /**
     * Handler for websocket open event
     */
    public onOpen(): void {
        config.collector.subscribe.forEach(subscribe => {
            const req = JSON.stringify(subscribe);
            Collector.logger.info(`Subscribing: ${req}`);
            this.census.send(req);
        });
    }

    /**
     * Handler for websocket on reception message
     *
     * @param {WebSocket.Data} raw
     */
    public onMessage(raw: Data): void {
        try {
            const data = JSON.parse(raw.toString());

            if (data.service == 'event')
                switch (data.type) {
                    case 'serviceMessage':
                        data.payload.recorded_at = new Date();
                        this.db.collection(data.payload.event_name).insertOne(data.payload);
                        break;
                    case 'heartbeat':
                        Collector.logger.silly(`Heartbeat: ${JSON.stringify(data.payload)}`);
                        break;
                }
        } catch (e) {
            Collector.logger.warn(`Could not parse payload: ${raw}`);
        }
    }
}
