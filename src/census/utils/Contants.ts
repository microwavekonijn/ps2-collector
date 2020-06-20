export enum Status {
    READY,
    CONNECTING,
    RECONNECTING,
    SUBSCRIBING,
    DISCONNECTED,
    IDLE
}

export enum ClientEvents {
    CLIENT_READY = 'ready',
    CLIENT_RECONNECTING = 'reconnecting',
    CLIENT_DISCONNECTED = 'disconnected',
    WARN = 'warn',
    ERROR = 'error',
    DEBUG = 'debug',
    RAW = 'raw'
}
