import path from 'path';
import fs from 'fs/promises';

import { readFileData, writeFileData } from '@/utils/file-data.helpers';
import { tryCatchAsync } from '@/utils/try-catch.helpers';

import { DBSet } from './types';

const ROOT_PATH = process.cwd();

const DB_FILE_NAME = 'db.txt';
export const DB_FILE_FULL_PATH = path.join(ROOT_PATH, 'src/db', DB_FILE_NAME);

const DB_INITIAL_CONTENT = '{"users":[]}';

export const ensureDbExists = async () => {
  const dbExistsPromise = fs.access(DB_FILE_FULL_PATH);
  const { error } = await tryCatchAsync(dbExistsPromise);
  if (error) {
    await fs.writeFile(DB_FILE_FULL_PATH, DB_INITIAL_CONTENT);
  }
};

export const updateDb = (newDbSet: DBSet) => {
  writeFileData(DB_FILE_FULL_PATH, newDbSet);
};

export const readFromDb = (): Promise<DBSet> => {
  return readFileData<DBSet>(DB_FILE_FULL_PATH);
};
