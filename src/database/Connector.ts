import Runnable from '../foundation/concerns/Runnable';
import { injectable } from 'inversify';
import { MongoClient } from 'mongodb';
import { getLogger } from '../logging';

@injectable()
export default class Connector implements Runnable {
    private static readonly logger = getLogger('database-connector');

    public constructor(
        private readonly client: MongoClient,
    ) {}

    public async boot(): Promise<void> {
        await this.client.connect();

        Connector.logger.info('Connected to database');
    }

    public async terminate(): Promise<void> {
        Connector.logger.info('Closing connection');

        await this.client.close();
    }
}
