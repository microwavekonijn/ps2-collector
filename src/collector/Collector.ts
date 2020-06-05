import Runnable from '../foundation/concerns/Runnable';
import { Container, inject, injectable } from 'inversify';
import WebSocket from 'ws';
import { getLogger } from '../logging';
import { URL } from 'url';
import config from '../config';
import { Db } from 'mongodb';

@injectable()
export default class Collector implements Runnable {
    private static readonly logger = getLogger('collector');

    public constructor(
        @inject('ps2ws') private readonly census: WebSocket,
    ) {}

    public async start(container: Container): Promise<void> {
        const db = container.get(Db);

        this.census.on('open', () => {
            Collector.logger.info(`Listening to census websocket (${this.maskedUrl})`);

            config.collector.subscribe.forEach(subscribe => {
                const req = JSON.stringify(subscribe);
                Collector.logger.info(`Subscribing: ${req}`);
                this.census.send(req);
            });
        });

        this.census.on('message', (raw) => {
            try {
                const data = JSON.parse(raw.toString());

                if (data.service == 'event')
                    switch (data.type) {
                        case 'serviceMessage':
                            data.payload.recorded_at = Date.now();
                            db.collection(data.payload.event_name).insertOne(data.payload);
                            break;
                        case 'heartbeat':
                            Collector.logger.silly(`Heartbeat: ${JSON.stringify(data.payload)}`);
                            break;
                    }
            } catch (e) {
                Collector.logger.warn(`Could not parse payload: ${raw}`);
            }
        });
    }

    public async terminate(): Promise<void> {
        Collector.logger.info('Terminating census websocket');
        this.census.close();
    }

    private get maskedUrl(): string {
        const url = new URL(this.census.url);
        url.searchParams.set('service-id', '*'); // TODO: Better solution to masking sensitive information

        return url.toString();
    }
}
