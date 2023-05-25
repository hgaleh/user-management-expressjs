import { HttpStatusCodes } from '@src/utility/constant/http-status-codes';

import {_delete as del, addOne, search, updateOne} from '@src/service/user-service';
import { isUser } from '@src/model/user';
import { Router } from 'express';
import jetValidator from 'jet-validator';

const validate = jetValidator();

export const userRouter = Router();

userRouter.get(
  '/search',
  async function(req, res) {
    const users = await search(req.query);
    return res.status(HttpStatusCodes.OK).json({ users });
  }
);

userRouter.post(
  '/add',
  validate(['user', isUser]),
  async function(req, res) {
    const { user } = req.body;
    await addOne(user);
    return res.status(HttpStatusCodes.CREATED).end();
  }
);

userRouter.put(
  '/update',
  validate(['user', isUser]),
  async function(req, res) {
    const { user } = req.body;
    await updateOne(user);
    return res.status(HttpStatusCodes.OK).end();
  }
);

userRouter.delete(
  '/delete/:id',
  validate(['id', 'number', 'params']),
  async function(req, res) {
    const id = +req.params.id;
    await del(id);
    return res.status(HttpStatusCodes.OK).end();
  }
);
