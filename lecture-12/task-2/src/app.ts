import 'reflect-metadata';

import { createExpressServer } from 'routing-controllers';

import { env } from './config/env';

import { ensureDbExists } from './db/db.helpers';

import { AppController } from './modules/app/app.controller';
import { UserController } from './modules/users/users.controller';

const { PORT } = env;

const bootstrap = async () => {
  await ensureDbExists();

  const app = createExpressServer({
    controllers: [AppController, UserController],
    routePrefix: '/api',
  });

  app.listen(PORT, () => {
    console.log('Express application successfully started');
  });
};
bootstrap();
