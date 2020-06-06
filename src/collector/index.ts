import { ContainerModule } from 'inversify';
import { RUNNABLE } from '../foundation/concerns/Runnable';
import Collector from './Collector';
import WebSocket from 'ws';
import config from '../config';
import { getLogger } from '../logging';
import PS2wsUrl from '../config/helpers/PS2wsUrl';

export default new ContainerModule((bind) => {
    bind(RUNNABLE).to(Collector);

    bind<PS2wsUrl>('ps2wsUrlPc')
        .toConstantValue(new PS2wsUrl(config.census.serviceID, config.census.ps2ws));

    bind<WebSocket>('ps2ws')
        .toDynamicValue(({container}) => {
            const urlPc = container.get<PS2wsUrl>('ps2wsUrlPc');
            const ws = new WebSocket(urlPc.toString());
            const logger = getLogger('ps2-websocket');

            ws.on('open', () => logger.info(`Listening to census websocket (${urlPc.toMaskedString()})`));
            ws.on('close', (code, reason) => logger.info(`Connection closed with code ${code}: ${reason}`));

            return ws;
        })
        .inSingletonScope();
});
