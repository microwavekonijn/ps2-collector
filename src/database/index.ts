import { ContainerModule } from 'inversify';
import Runnable, { RUNNABLE } from '../foundation/concerns/Runnable';
import Connector from './Connector';
import { MongoClient } from 'mongodb';
import config from '../config';

export default new ContainerModule(bind => {
    bind<Runnable>(RUNNABLE).to(Connector);

    bind(MongoClient)
        .toDynamicValue(() => new MongoClient(config.database.mongoUri, config.database.mongoConfig))
        .inSingletonScope();
});
