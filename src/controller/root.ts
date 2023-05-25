import { Router } from 'express';
import { userRouter } from './user/user-route';

// **** Variables **** //
export const apiRouter = Router();

// Add UserRouter
apiRouter.use('/users', userRouter);