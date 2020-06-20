import { injectable } from 'inversify';
import { Redis } from 'ioredis';

@injectable()
export default class AntiDuplicator {
    private decay = 10;

    public constructor(
        private readonly redis: Redis,
    ) {}

    public duplicate(key: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.redis.exists(key, (err, reply) => {
                err
                    ? reject(err)
                    : resolve(reply > 0);
            });
        });
    }

    public record(key: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.redis.setex(key, this.decay, 'hi', (err, reply) => {
                err
                    ? reject(err)
                    : resolve();
            });
        });
    }
}
