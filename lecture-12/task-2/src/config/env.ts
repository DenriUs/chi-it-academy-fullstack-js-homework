import { config } from 'dotenv';

config({ quiet: true });

const { PORT } = process.env;

if (!PORT) {
  throw new Error('Mssing PORT env');
}

export const env = {
  PORT,
};
