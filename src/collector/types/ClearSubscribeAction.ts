import EventName from './EventName';
import { Character, World } from './BaseEntities';


declare type ClearSubscribeAction = {
    service: 'event';
    action: 'clearSubscribe';
    characters: Array<Character>;
    worlds: Array<World>;
    eventNames: Array<EventName>;
    logicalAndCharactersWithWorlds?: boolean;
} | {
    service: 'event';
    action: 'clearSubscribe';
    all: true;
}

export default ClearSubsribeAction;
