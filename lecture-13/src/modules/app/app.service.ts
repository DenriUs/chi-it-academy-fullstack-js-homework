import path from 'path';

import { readFileData } from '@/utils/file-data.helpers';
import { AuthorData } from '@/types/author';

const ROOT_PATH = process.cwd();

const AUTHOR_FILE_NAME = 'author.json';
const AUTHOR_FILE_FULL_PATH = path.join(ROOT_PATH, AUTHOR_FILE_NAME);

export const appService = {
  async getAuthor(): Promise<AuthorData> {
    return readFileData<AuthorData>(AUTHOR_FILE_FULL_PATH);
  },
};
