import EventName from './EventName';
import Character from './Character';
import World from './World';

export default interface SubscribeAction {
    service: 'event';
    action: 'subscribe';
    characters: Array<Character>;
    worlds: Array<World>;
    eventNames: Array<EventName>;
    logicalAndCharactersWithWorlds?: boolean;
}
