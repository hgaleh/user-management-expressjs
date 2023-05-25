/**
 * Setup express server.
 */

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import 'express-async-errors';

import { apiRouter } from '@src/controller/root';

import { environmentVariable } from '@src/utility/constant/environment-variable';
import { HttpStatusCode } from '@src/utility/constant/http-status-code';

import { NodeEnvironment } from '@src/utility/constant/node-environment';
import { RouteError } from './utility/route-error';

export const app = express();


// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(environmentVariable.cookieProps.secret));

// Show routes called in console during development
if (environmentVariable.nodeEnv === NodeEnvironment.Dev) {
  app.use(morgan('dev'));
}

// Security
if (environmentVariable.nodeEnv === NodeEnvironment.Production) {
  app.use(helmet());
}

// Add APIs, must be after middleware
app.use('/api', apiRouter);

// Add error handler
app.use((
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  if (environmentVariable.nodeEnv !== NodeEnvironment.Test) {
    logger.err(err, true);
  }
  let status = HttpStatusCode.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});
