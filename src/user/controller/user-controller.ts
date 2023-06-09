import { HttpStatusCode } from '@src/utility/constant/http-status-code';

import {_delete as del, addOne, search, updateOne} from '@src/user/user-service';
import { Router } from 'express';
import { addUserValidator, deleteValidator, updateUserValidator } from './user-validator';
import { validationResult } from 'express-validator';

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
  addUserValidator,
  async function(req: any, res: any) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = req.body;
    await addOne(user);
    return res.status(HttpStatusCode.CREATED).end();
  }
);

userRouter.put(
  '/update',
  updateUserValidator,
  async function(req: any, res: any) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = req.body;
    await updateOne(user);
    return res.status(HttpStatusCode.OK).end();
  }
);

userRouter.delete(
  '/delete/:id',
  deleteValidator,
  async function(req: any, res: any) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = +req.params.id;
    await del(id);
    return res.status(HttpStatusCode.OK).end();
  }
);
