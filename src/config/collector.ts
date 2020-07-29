import { EventStreamSubscription } from 'ps2census';

export default class Collector {
    /**
     * @type {EventStreamSubscription[]} Subscriptions that are made when starting the websocket
     */
    public readonly subscriptions: Array<EventStreamSubscription> = [{
        eventNames: ['all'],
        characters: ['all'],
        worlds: ['all'],
    }];
}
