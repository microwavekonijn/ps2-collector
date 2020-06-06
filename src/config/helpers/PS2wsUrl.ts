import { PS2wsConfig } from '../concerns/collector';

export default class PS2wsUrl {
    public constructor(
        private readonly serviceID: string,
        private readonly config: PS2wsConfig,
    ) {}

    public toString(): string {
        return `${this.config.url}?environment=${this.config.environment}&service-id=s:${this.serviceID}`;
    }

    public toMaskedString(): string {
        return `${this.config.url}?environment=${this.config.environment}&service-id=s:*`;
    }
}
