import SubscribeAction from '../collector/types/SubscribeAction';
import EventName from '../collector/types/EventName';

export default class Collector {
    /**
     * @type {SubscribeAction[]} Subscriptions that are made when starting the websocket
     */
    public readonly subscribe: Array<SubscribeAction> = [{
        service: 'event',
        action: 'subscribe',
        characters: ['all'],
        eventNames: [EventName.METAGAME_EVENT],
        worlds: ['all'],
        logicalAndCharactersWithWorlds: true,
    }];
}
