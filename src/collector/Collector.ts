import Runnable from '../foundation/concerns/Runnable';
import { inject, injectable } from 'inversify';
import WebSocket from 'ws';
import { getLogger } from '../logging';
import { URL } from 'url';
import config from '../config';

@injectable()
export default class Collector implements Runnable {
    private static readonly logger = getLogger('collector');

    public constructor(
        @inject('ps2ws') private readonly census: WebSocket,
    ) {
    }

    public async start(): Promise<void> {
        this.census.on('open', () => {
            Collector.logger.info(`Listening to census websocket (${this.maskedUrl})`);

            config.collector.subscribe.forEach(subscribe => {
                const req = JSON.stringify(subscribe);
                Collector.logger.info(`Subscribing: ${req}`);
                this.census.send(req);
            });
        });

        this.census.on('message', (data) => {
            const payload = JSON.parse(data.toString());

            if (payload.service == 'event')
                switch (payload.type) {
                    case 'serviceMessage':
                        Collector.logger.info(`Received: ${JSON.stringify(payload.payload)}`);
                        break;
                    case 'heartbeat':
                        Collector.logger.silly(`Heartbeat: ${JSON.stringify(payload.payload)}`);
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
