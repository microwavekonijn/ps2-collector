import { ContainerModule } from 'inversify';
import Runnable, { RUNNABLE } from '../foundation/concerns/Runnable';
import Connector from './Connector';
import { Db, MongoClient } from 'mongodb';
import config from '../config';
import { createClient, RedisClient } from 'redis';

export default new ContainerModule(bind => {
    bind<Runnable>(RUNNABLE).to(Connector);

    bind(MongoClient)
        .toDynamicValue(() => new MongoClient(config.database.mongoUri, config.database.mongoConfig))
        .inSingletonScope();

    bind(Db)
        .toDynamicValue(({container}) => container.get(MongoClient).db())
        .inSingletonScope();

    bind(RedisClient)
        .toDynamicValue(() => createClient(config.database.redisUri))
        .inSingletonScope();
});
