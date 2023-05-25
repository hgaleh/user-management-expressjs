import { HttpStatusCodes } from '@src/utility/constant/http-status-codes';

import {_delete as del, addOne, search, updateOne} from '@src/service/user-service';
import { IUser, isUser } from '@src/model/user';
import { Router } from 'express';
import jetValidator from 'jet-validator';
import { IReq, IRes } from '@src/utility/types';

const validate = jetValidator();

export const userRouter = Router();

userRouter.get(
  '/search',
  async function(req: IReq, res: IRes) {
    const users = await search(req.query);
    return res.status(HttpStatusCodes.OK).json({ users });
  }
);

userRouter.post(
  '/add',
  validate(['user', isUser]),
  async function(req: IReq<{user: IUser}>, res: IRes) {
    const { user } = req.body;
    await addOne(user);
    return res.status(HttpStatusCodes.CREATED).end();
  }
);

userRouter.put(
  '/update',
  validate(['user', isUser]),
  async function(req: IReq<{user: IUser}>, res: IRes) {
    const { user } = req.body;
    await updateOne(user);
    return res.status(HttpStatusCodes.OK).end();
  }
);

userRouter.delete(
  '/delete/:id',
  validate(['id', 'number', 'params']),
  async function(req: IReq, res: IRes) {
    const id = +req.params.id;
    await del(id);
    return res.status(HttpStatusCodes.OK).end();
  }
);
