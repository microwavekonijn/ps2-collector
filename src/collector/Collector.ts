import Runnable from '../foundation/concerns/Runnable';
import { injectable, multiInject } from 'inversify';
import { getLogger } from '../logging';
import { Client } from 'ps2census';
import { Db, MongoClient } from 'mongodb';

@injectable()
export default class Collector implements Runnable {
    private static readonly logger = getLogger('collector');

    /**
     * @param {Client[]} clients
     * @param {MongoClient} mongo
     */
    public constructor(
        @multiInject(Client) private readonly clients: Client[],
        private readonly mongo: MongoClient,
    ) {}

    private prepareClient(db: Db, client: Client) {
        const collection = 'App_Census';
        const environment = client.environment;

        client.on('ps2Event', (event) => {
            if (['GainExperience'].includes(event.event_name)) return;

            db.collection(`World_${event.world_id}_${event.event_name}`).insertOne({
                recorded_at: new Date(),
                duplicate: false,
                ...event,
                client: undefined,
            });
        });

        client.on('duplicate', (event) => {
            if (['GainExperience'].includes(event.event_name)) return;

            db.collection(`World_${event.world_id}_${event.event_name}`).insertOne({
                recorded_at: new Date(),
                duplicate: true,
                ...event,
                client: undefined,
            });
        });

        client.on('warn', (e) => {
            db.collection(collection).insertOne({
                recorded_at: new Date(),
                event: 'warn',
                message: e.message,
                environment,
            });
        });

        client.on('ready', () => {
            db.collection(collection).insertOne({
                recorded_at: new Date(),
                event: 'ready',
                environment,
            });
        });

        client.on('disconnected', () => {
            db.collection(collection).insertOne({
                recorded_at: new Date(),
                event: 'disconnected',
                environment,
            });
        });

        client.on('reconnecting', () => {
            db.collection(collection).insertOne({
                recorded_at: new Date(),
                event: 'reconnecting',
                environment,
            });
        });

        client.on('subscribed', (sub) => {
            db.collection(collection).insertOne({
                recorded_at: new Date(),
                event: 'subscribed',
                message: sub,
                environment,
            });
        });

        client.on('debug', (info, label) => {
            db.collection('App_Debug').insertOne({
                recorded_at: new Date(),
                info,
                label,
                environment,
            });
        });
    }

    /**
     * Start listening to the websocket
     *
     * @return {Promise<void>}
     */
    public async start(): Promise<void> {
        const db = this.mongo.db();

        this.clients.forEach(c => this.prepareClient(db, c));

        await Promise.all(this.clients.map(c => c.watch()));
    }

    /**
     * Terminate the websocket
     *
     * @return {Promise<void>}
     */
    public async terminate(): Promise<void> {
        Collector.logger.info('Terminating census websocket');
        this.clients.map(c => c.destroy());
    }
}
