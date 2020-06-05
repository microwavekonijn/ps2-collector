import { ContainerModule } from 'inversify';
import Runnable, { RUNNABLE } from '../foundation/concerns/Runnable';
import Connector from './Connector';
import { Db, MongoClient } from 'mongodb';
import config from '../config';

export default new ContainerModule(bind => {
    bind<Runnable>(RUNNABLE).to(Connector);

    bind(MongoClient)
        .toDynamicValue(() => new MongoClient(config.database.uri, config.database.config))
        .inSingletonScope();

    bind(Db)
        .toDynamicValue(({container}) => container.get(MongoClient).db())
        .inSingletonScope();
});
