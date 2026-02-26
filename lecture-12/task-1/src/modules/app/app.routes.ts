import { Router } from 'express';

import { usersRouter } from '@/modules/users/users.router';

import { appController } from './app.controller';

const router = Router();

router.get('/', appController.getAuthor);
router.use('/users', usersRouter);

export const appRouter = router;
