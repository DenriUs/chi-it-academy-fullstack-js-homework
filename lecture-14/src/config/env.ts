import { config } from 'dotenv';

config();

const {
  SERVER_URL,
  JWT_SECRET,
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_SYNCHRONIZE,
} = process.env;

if (
  !SERVER_URL ||
  !JWT_SECRET ||
  !TYPEORM_DATABASE ||
  !TYPEORM_HOST ||
  !TYPEORM_PORT ||
  !TYPEORM_USERNAME ||
  !TYPEORM_PASSWORD ||
  !TYPEORM_SYNCHRONIZE
) {
  throw new Error('Not all .env variables are configured');
}

export const envConfig = {
  serverUrl: SERVER_URL,
  database: TYPEORM_DATABASE,
  dbHost: TYPEORM_HOST,
  dbPort: Number(TYPEORM_PORT),
  dbUsername: TYPEORM_USERNAME,
  dbPassword: TYPEORM_PASSWORD,
  dbSynchronize: Boolean(TYPEORM_SYNCHRONIZE),
  jwtSecret: JWT_SECRET,
};
