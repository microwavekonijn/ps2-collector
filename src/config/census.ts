import { get } from './utils/env';

export default class Census {
    public readonly serviceID: string = get('CENSUS_SERVICE_ID');

    public readonly ps2ws = {
        url: 'wss://push.planetside2.com/streaming',
        environment: 'ps2',
    };
}
