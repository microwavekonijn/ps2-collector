import Runnable from '../foundation/concerns/Runnable';
import { injectable } from 'inversify';
import { getLogger } from '../logging';
import { Client } from 'ps2census';

@injectable()
export default class Collector implements Runnable {
    private static readonly logger = getLogger('collector');

    /**
     * @param {Client} client
     */
    public constructor(
        private readonly client: Client,
    ) {}

    /**
     * Start listening to the websocket
     *
     * @return {Promise<void>}
     */
    public async start(): Promise<void> {

        this.client.on('death', event => console.log(event.character_id, event.attacker_character_id));

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
