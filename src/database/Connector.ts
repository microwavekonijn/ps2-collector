import Runnable from '../foundation/concerns/Runnable';
import { injectable } from 'inversify';
import { MongoClient } from 'mongodb';
import { getLogger } from '../logging';

@injectable()
export default class Connector implements Runnable {
    private static readonly logger = getLogger('database-connector');

    /**
     * @param {MongoClient} client
     */
    public constructor(
        private readonly client: MongoClient,
    ) {}

    /**
     * Create a connection to the database
     *
     * @return {Promise<void>}
     */
    public async boot(): Promise<void> {
        await this.client.connect();

        Connector.logger.info('Connected to database');
    }

    /**
     * Terminate connection to the database
     *
     * @return {Promise<void>}
     */
    public async terminate(): Promise<void> {
        Connector.logger.info('Closing connection');

        try {
            await this.client.close();
        } catch {
            // Beep beep
        }
    }
}
