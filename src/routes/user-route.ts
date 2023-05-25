import {HttpStatusCodes} from '@src/constants/http-status-codes';

import UserService from '@src/services/UserService';
import User, { IUser } from '@src/models/User';
import { IReq, IRes } from '../other/express/misc';
import { Router } from 'express';
import jetValidator from 'jet-validator';

const validate = jetValidator();

// ** Add UserRouter ** //

export const userRouter = Router();

// Get all users
userRouter.get(
  '/search',
  async function(req: IReq, res: IRes) {
    const users = await UserService.search(req.query);
    return res.status(HttpStatusCodes.OK).json({ users });
  }
);

// Add one user
userRouter.post(
  '/add',
  validate(['user', User.isUser]),
  async function(req: IReq<{user: IUser}>, res: IRes) {
    const { user } = req.body;
    await UserService.addOne(user);
    return res.status(HttpStatusCodes.CREATED).end();
  }
);

// Update one user
userRouter.put(
  '/update',
  validate(['user', User.isUser]),
  async function(req: IReq<{user: IUser}>, res: IRes) {
    const { user } = req.body;
    await UserService.updateOne(user);
    return res.status(HttpStatusCodes.OK).end();
  }
);

// Delete one user
userRouter.delete(
  '/delete/:id',
  validate(['id', 'number', 'params']),
  async function(req: IReq, res: IRes) {
    const id = +req.params.id;
    await UserService.delete(id);
    return res.status(HttpStatusCodes.OK).end();
  }
);
