import { get } from './utils/env';

export default class Database {
    public readonly uri: string = get('MONGODB_URL', 'mongodb://localhost:27017/ps2collector');
}
