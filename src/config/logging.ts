import {get} from "./utils/env";

export default class Logging {
    public readonly level: string = get('LOG_LEVEL', 'info');

    public readonly driver: string | string[];

    public readonly drivers: any = {};
}
