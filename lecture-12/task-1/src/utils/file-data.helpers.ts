import fs from 'fs/promises';

import { tryCatch, tryCatchAsync } from './try-catch.helpers';

export const writeFileData = async (filePath: string, data: unknown) => {
  const writeFilePromise = fs.writeFile(filePath, JSON.stringify(data));
  const { error } = await tryCatchAsync(writeFilePromise);
  if (error) {
    console.error('Error during file write: ', error);
  }
};

export const readFileData = async <T>(filePath: string): Promise<T> => {
  const readFilePromise = fs.readFile(filePath, 'utf-8');
  const { data: dataString, error: readError } = await tryCatchAsync(readFilePromise);
  if (readError) {
    console.error('Error during file read:', readError);
    return {} as T;
  }
  const { data, error: parseError } = tryCatch<T>(() => {
    return JSON.parse(dataString);
  });
  if (parseError) {
    console.error('Error during data parsing:', parseError);
    return {} as T;
  }
  return data;
};
