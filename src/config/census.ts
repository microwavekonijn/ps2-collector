import { get } from './utils/env';
import { PS2wsConfig } from './concerns/collector';

export default class Census {
    /**
     * @type {string} Service id used when connecting to the census api
     */
    public readonly serviceID: string = get('CENSUS_SERVICE_ID');

    /**
     * @type {PS2wsConfig} Configuration PS2 websocket
     */
    public readonly ps2ws: PS2wsConfig = {
        url: 'wss://push.planetside2.com/streaming',
        environment: 'ps2',
    };
}

