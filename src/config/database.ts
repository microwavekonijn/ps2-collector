import { get } from './utils/env';
import { MongoClientOptions } from 'mongodb';

export default class Database {
    public readonly uri: string = get('MONGODB_URL', 'mongodb://localhost:27017/ps2collector');

    public readonly config: MongoClientOptions = {
        useUnifiedTopology: true,
    };
}
