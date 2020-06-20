import EventName from '../collector/types/EventName';
import { PS2ClientSubscription } from '../census/utils/Types';

export default class Collector {
    /**
     * @type {SubscribeAction[]} Subscriptions that are made when starting the websocket
     */
    public readonly subscribe: Array<PS2ClientSubscription> = [{
        eventNames: [EventName.ALL],
        worlds: ['all'],
    }];
}
