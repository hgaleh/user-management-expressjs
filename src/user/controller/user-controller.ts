import { HttpStatusCode } from '@src/utility/constant/http-status-code';

import {_delete as del, addOne, search, updateOne} from '@src/user/user-service';
import { Router } from 'express';
import { addUserValidator } from './user-validator';

export const userRouter = Router();

userRouter.get(
  '/search',
  async function(req, res) {
    const users = await search(req.query);
    return res.status(HttpStatusCode.OK).json({ users });
  }
);

userRouter.post(
  '/add',
  addUserValidator[0],
  async function(req, res) {
    const user = req.body;
    await addOne(user);
    return res.status(HttpStatusCode.CREATED).end();
  }
);

userRouter.put(
  '/update',
  // validate(['user', isUser]),
  async function(req, res) {
    const { user } = req.body;
    await updateOne(user);
    return res.status(HttpStatusCode.OK).end();
  }
);

userRouter.delete(
  '/delete/:id',
  // validate(['id', 'number', 'params']),
  async function(req, res) {
    const id = +req.params.id;
    await del(id);
    return res.status(HttpStatusCode.OK).end();
  }
);
