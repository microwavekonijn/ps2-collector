import { PS2wsConfig } from '../concerns/collector';
import config from '../index';

export default class PS2wsUrl {
    public constructor(
        private readonly config: PS2wsConfig,
    ) {}

    public toString(): string {
        return `${config.census.ps2ws.url}?environment=${config.census.ps2ws.environment}&service-id=s:${config.census.serviceID}`;
    }

    public toMaskedString(): string {
        return `${config.census.ps2ws.url}?environment=${config.census.ps2ws.environment}&service-id=s:*`;
    }
}
