import { DataSource } from 'typeorm';

import { env } from './config/env';

export const AppDataSource = new DataSource({
  type: 'postgres',
  database: env.TYPEORM_DATABASE,
  host: env.TYPEORM_HOST,
  port: env.TYPEORM_PORT,
  username: env.TYPEORM_USERNAME,
  password: env.TYPEORM_PASSWORD,
  synchronize: env.TYPEORM_SYNCHRONIZE,
  entities: [`${__dirname}/modules/**/entities/*.entity.{ts,js}`],
});
