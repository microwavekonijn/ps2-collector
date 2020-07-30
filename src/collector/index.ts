import { ContainerModule } from 'inversify';
import { RUNNABLE } from '../foundation/concerns/Runnable';
import Collector from './Collector';
import { Client, PS2Environment } from 'ps2census';
import config from '../config';
import { getLogger } from '../logging';

export default new ContainerModule((bind) => {
    bind(RUNNABLE).to(Collector);


    (['ps2', 'ps2ps4eu', 'ps2ps4us'] as PS2Environment[]).forEach(environment => {
        bind(Client).toDynamicValue(() => {
            const client = new Client({
                serviceId: config.census.serviceID,
                environment,
                streamManagerConfig: {
                    subscriptions: config.collector.subscriptions,
                },
            });
            const logger = getLogger(`${environment}-client`);

            client.on('warn', e => logger.warn(e));
            client.on('ready', () => logger.info('Connected'));
            client.on('disconnected', () => logger.info('Disconnected'));
            client.on('reconnecting', () => logger.info('Reconnecting'));
            client.on('subscribed', sub => logger.info(`Subscribed to: ${JSON.stringify(sub)}`));

            return client;
        }).inSingletonScope();
    });
});
