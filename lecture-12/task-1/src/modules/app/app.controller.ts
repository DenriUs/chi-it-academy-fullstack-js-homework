import { Request, Response } from 'express';

import { appService } from './app.service';

export const appController = {
  async getAuthor(_: Request, res: Response): Promise<Response> {
    const result = await appService.getAuthor();
    return res.status(200).json(result);
  },
};
