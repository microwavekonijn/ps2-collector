import Runnable from '../foundation/concerns/Runnable';
import { injectable } from 'inversify';
import { getLogger } from '../logging';
import { Client } from 'ps2census';
import { Db, MongoClient } from 'mongodb';

@injectable()
export default class Collector implements Runnable {
    private static readonly logger = getLogger('collector');

    private db: Db;

    /**
     * @param {Client} client
     * @param {MongoClient} mongo
     */
    public constructor(
        private readonly client: Client,
        private readonly mongo: MongoClient,
    ) {}

    /**
     * Start listening to the websocket
     *
     * @return {Promise<void>}
     */
    public async start(): Promise<void> {
        this.db = this.mongo.db();
        const collection = 'App_Census';

        this.client.on('ps2Event', (event) => {
            if (['GainExperience'].includes(event.event_name)) return;

            this.db.collection(`World ${event.world_id}_${event.event_name}`).insertOne({
                recorded_at: new Date(),
                duplicate: false,
                ...event,
            });
        });

        this.client.on('duplicate', (event) => {
            this.db.collection(`World ${event.world_id}_${event.event_name}`).insertOne({
                recorded_at: new Date(),
                duplicate: true,
                ...event,
            });
        });

        this.client.on('warn', (e) => {
            this.db.collection(collection).insertOne({
                recorded_at: new Date(),
                event: 'warn',
                message: e.message,
            });
        });

        this.client.on('ready', () => {
            this.db.collection(collection).insertOne({
                recorded_at: new Date(),
                event: 'ready',
            });
        });

        this.client.on('disconnected', () => {
            this.db.collection(collection).insertOne({
                recorded_at: new Date(),
                event: 'disconnected',
            });
        });

        this.client.on('reconnecting', () => {
            this.db.collection(collection).insertOne({
                recorded_at: new Date(),
                event: 'reconnecting',
            });
        });

        this.client.on('subscribed', (sub) => {
            this.db.collection(collection).insertOne({
                recorded_at: new Date(),
                event: 'subscribed',
                message: sub,
            });
        });

        this.client.on('debug', (info, label) => {
            this.db.collection(collection).insertOne({
                recorded_at: new Date(),
                event: 'debug',
                message: info,
                label,
            });
        });

        await this.client.watch();
    }

    /**
     * Terminate the websocket
     *
     * @return {Promise<void>}
     */
    public async terminate(): Promise<void> {
        Collector.logger.info('Terminating census websocket');
        this.client.destroy();
    }
}
