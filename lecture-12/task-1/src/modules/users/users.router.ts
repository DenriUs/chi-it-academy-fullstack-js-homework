import { Router } from 'express';

import { usersController } from './users.controller';

const router = Router({ mergeParams: true });

router.post('/', usersController.createOne);
router.get('/', usersController.find);
router.patch('/:userId', usersController.updateOne);
router.delete('/:userId', usersController.deleteOne);

export const usersRouter = router;
