import { ContainerModule } from 'inversify';
import { RUNNABLE } from '../foundation/concerns/Runnable';
import Collector from './Collector';
import PS2EventClient from '../census/PS2EventClient';
import config from '../config';
import { getLogger } from '../logging';

export default new ContainerModule((bind) => {
    bind(RUNNABLE).to(Collector);

    bind(PS2EventClient).toDynamicValue(() => {
        const client = new PS2EventClient(config.census.serviceID, {
            subscriptions: config.collector.subscribe,
        });
        const logger = getLogger('ps2-event-client');

        client.on('warn', (e) => logger.warn(e));
        client.on('ready', () => logger.info('Connected'));
        client.on('disconnected', () => logger.info('Disconnected'));
        client.on('reconnecting', () => logger.info('Reconnecting'));
        client.on('subscribed', (sub) => logger.info(`Subscribed to: ${JSON.stringify(sub)}`));

        return client;
    }).inSingletonScope();
});
