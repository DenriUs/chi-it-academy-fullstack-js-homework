import { readFromDb, updateDb } from '@/db/db.helpers';

import { UserEntity } from './entities/user.entity';

export const usersService = {
  async createOne({ username, email }: Omit<UserEntity, 'id'>) {
    const dbSet = await readFromDb();
    const users = dbSet.users;

    const latestId = users[users.length - 1]?.id ? users[users.length - 1].id : 0;
    dbSet.users = [...users, { id: latestId + 1, username, email }];
    updateDb(dbSet);
  },

  async find(): Promise<UserEntity[]> {
    const dbSet = await readFromDb();
    return dbSet.users;
  },

  async updateOne(id: UserEntity['id'], input: Partial<UserEntity>) {
    const dbSet = await readFromDb();
    const users = dbSet.users;

    dbSet.users = users.map((user) => (user.id === id ? { ...user, ...input } : user));
    updateDb(dbSet);
  },

  async deleteOne(id: UserEntity['id']) {
    const dbSet = await readFromDb();
    const users = dbSet.users;

    dbSet.users = users.filter((user) => user.id !== id);
    updateDb(dbSet);
  },
};
