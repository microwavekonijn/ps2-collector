import { ContainerModule } from 'inversify';
import { RUNNABLE } from '../foundation/concerns/Runnable';
import Collector from './Collector';
import WebSocket from 'ws';
import config from '../config';

export default new ContainerModule((bind) => {
    bind(RUNNABLE).to(Collector);

    bind<string>('ps2wsURL')
        .toConstantValue(`${config.census.ps2ws.url}?environment=${config.census.ps2ws.environment}&service-id=s:${config.census.serviceID}`);

    bind<WebSocket>('ps2ws')
        .toDynamicValue(({container}) => new WebSocket(container.get<string>('ps2wsURL')))
        .inSingletonScope();
});
