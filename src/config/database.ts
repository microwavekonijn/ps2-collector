import { get } from './utils/env';
import { MongoClientOptions } from 'mongodb';

export default class Database {
    /**
     * @type {string} MongoDB connection url
     */
    public readonly mongoUri: string = get('MONGODB_URL', 'mongodb://localhost:27017/ps2collector');

    /**
     * @type {MongoClientOptions} MongoDB connection config
     */
    public readonly mongoConfig: MongoClientOptions = {
        useUnifiedTopology: true,
    };

    /**
     * @type {string} Redis connection url
     */
    public readonly redisUri: string = get('REDIS_URL', 'redis://localhost:6379');
}
