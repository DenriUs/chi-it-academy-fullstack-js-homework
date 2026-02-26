import { Request, Response } from 'express';

import { UserEntity } from './entities/user.entity';
import { usersService } from './users.service';

export const usersController = {
  async createOne(req: Request, res: Response): Promise<Response> {
    const { username, email } = req.body as UserEntity;
    await usersService.createOne({ username, email });
    return res.sendStatus(201);
  },

  async find(_: Request, res: Response): Promise<Response> {
    const result = await usersService.find();
    return res.status(200).json(result);
  },

  async updateOne(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    const { username, email } = req.body;

    const parseUserId = parseInt(userId as string);
    await usersService.updateOne(parseUserId, { username, email });
    return res.sendStatus(200);
  },

  async deleteOne(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;

    const parseUserId = parseInt(userId as string);
    await usersService.deleteOne(parseUserId);
    return res.sendStatus(200);
  },
};
