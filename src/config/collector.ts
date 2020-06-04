import SubscribeAction from './types/SubscribeAction';
import EventName from './types/EventName';

export default class Collector {
    public readonly subscribe: Array<SubscribeAction> = [{
        service: 'event',
        action: 'subscribe',
        characters: ['all'],
        eventNames: [EventName.ALL],
        worlds: ['all'],
        logicalAndCharactersWithWorlds: true,
    }];
}
