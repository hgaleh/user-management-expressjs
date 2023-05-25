import { Request, Response } from 'express';
import { Query } from 'express-serve-static-core';

import { ISessionUser } from '@src/model/user';

export interface IReqQuery<T extends Query, U = void> extends Request {
  query: T;
  body: U;
}

export interface IReq<T = void> extends Request {
  body: T;
}

export interface IRes extends Response {
  locals: {
    sessionUser: ISessionUser;
  };
}

