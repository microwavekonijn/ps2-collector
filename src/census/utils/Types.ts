import DuplicateFilter from './DuplicateFilter';

export type PS2Environment = 'ps2' | 'ps2ps2us' | 'ps2ps4eu';

export type PS2ClientConfig = {
    environment?: PS2Environment,
    heartbeatInterval?: number,
    subscriptions?: PS2ClientSubscription[],
    duplicateFilter?: DuplicateFilter | null
}

export type PS2ClientSubscription = {
    characters: string[],
    worlds?: string[],
    eventNames: string[]
} | {
    characters?: string[],
    worlds: string[],
    eventNames: string[]
}

export enum State {
    IDLE,
    CONNECTING,
    NEARLY,
    RECONNECTING,
    READY,
    DISCONNECTED
}

export enum ClientEvents {
    CLIENT_READY = 'ready',
    CLIENT_DISCONNECTED = 'disconnected',
    CLIENT_RECONNECTING = 'reconnecting',
    ERROR = 'error',
    WARN = 'warn',
    DEBUG = 'debug',
    PS2_EVENT = 'event',
    PS2_DUPLICATE = 'duplicate',
    PS2_SUBSCRIBED = 'subscribed'
}
