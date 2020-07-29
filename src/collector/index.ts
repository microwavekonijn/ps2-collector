import { ContainerModule } from 'inversify';
import { RUNNABLE } from '../foundation/concerns/Runnable';
import Collector from './Collector';
import { Client } from 'ps2census';
import config from '../config';
import { getLogger } from '../logging';

export default new ContainerModule((bind) => {
    bind(RUNNABLE).to(Collector);

    bind(Client).toDynamicValue(() => {
        const client = new Client({
            serviceId: config.census.serviceID,
            streamManagerConfig: {
                subscriptions: config.collector.subscriptions,
            },
        });
        const logger = getLogger('ps2-client');

        client.on('warn', e => logger.warn(e));
        client.on('ready', () => logger.info('Connected'));
        client.on('disconnected', () => logger.info('Disconnected'));
        client.on('reconnecting', () => logger.info('Reconnecting'));
        client.on('subscribed', sub => logger.info(`Subscribed to: ${JSON.stringify(sub)}`));

        return client;
    }).inSingletonScope();
});
