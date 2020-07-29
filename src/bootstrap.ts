import 'reflect-metadata';
import { config as dotenv } from 'dotenv';

dotenv();

import { Container } from 'inversify';
import Kernel from './foundation/Kernel';
import config from './config';

const app = new Container({autoBindInjectable: true, skipBaseClassChecks: true});

app.bind<Container>(Container).toConstantValue(app);
app.bind<Kernel>(Kernel).toSelf().inSingletonScope();
app.load(...config.app.modules);

export default app;
