import EventName from './EventName';
import { Character, World } from './BaseEntities';

declare type SubscribeAction = {
    service: 'event';
    action: 'subscribe';
    characters?: Array<Character>;
    worlds: Array<World>;
    eventNames: Array<EventName>;
    logicalAndCharactersWithWorlds?: boolean;
} | {
    service: 'event';
    action: 'subscribe';
    characters: Array<Character>;
    worlds?: Array<World>;
    eventNames: Array<EventName>;
    logicalAndCharactersWithWorlds?: boolean;
}

export default SubsribeAction;
