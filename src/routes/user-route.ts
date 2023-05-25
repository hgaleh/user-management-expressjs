import {HttpStatusCodes} from '@src/constants/http-status-codes';

import {_delete as del, addOne, search, updateOne} from '@src/services/user-service';
import { IUser, isUser } from '@src/models/user';
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
    const users = await search(req.query);
    return res.status(HttpStatusCodes.OK).json({ users });
  }
);

// Add one user
userRouter.post(
  '/add',
  validate(['user', isUser]),
  async function(req: IReq<{user: IUser}>, res: IRes) {
    const { user } = req.body;
    await addOne(user);
    return res.status(HttpStatusCodes.CREATED).end();
  }
);

// Update one user
userRouter.put(
  '/update',
  validate(['user', isUser]),
  async function(req: IReq<{user: IUser}>, res: IRes) {
    const { user } = req.body;
    await updateOne(user);
    return res.status(HttpStatusCodes.OK).end();
  }
);

// Delete one user
userRouter.delete(
  '/delete/:id',
  validate(['id', 'number', 'params']),
  async function(req: IReq, res: IRes) {
    const id = +req.params.id;
    await del(id);
    return res.status(HttpStatusCodes.OK).end();
  }
);
