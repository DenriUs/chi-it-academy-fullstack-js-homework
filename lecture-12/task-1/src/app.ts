import express from 'express';

import { env } from './config/env';

import { ensureDbExists } from './db/db.helpers';
import { appRouter } from './modules/app/app.routes';

const { PORT } = env;

const bootstrap = async () => {
  await ensureDbExists();

  const app = express();

  app.use(express.json());

  app.use('/api', appRouter);

  app.listen(PORT, () => {
    console.log('Express application successfully started');
  });
};
bootstrap();
