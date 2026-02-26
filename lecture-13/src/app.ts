import 'reflect-metadata';

import { createExpressServer } from 'routing-controllers';

import { env } from './config/env';
import { AppDataSource } from './data-source';

import { AppController } from './modules/app/app.controller';
import { UserController } from './modules/users/users.controller';

const bootstrap = async () => {
  await AppDataSource.initialize();

  const app = createExpressServer({
    controllers: [AppController, UserController],
    routePrefix: '/api',
  });

  app.listen(env.PORT, () => {
    console.log('Express application successfully started');
  });
};
bootstrap();
