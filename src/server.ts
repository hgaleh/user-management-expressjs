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

import { envVars } from '@src/utility/constant/env-vars';
import { HttpStatusCodes } from '@src/utility/constant/http-status-codes';

import { NodeEnvs } from '@src/utility/constant/misc';
import { RouteError } from './utility/classes';

export const app = express();


// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(envVars.CookieProps.Secret));

// Show routes called in console during development
if (envVars.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (envVars.NodeEnv === NodeEnvs.Production) {
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
  if (envVars.NodeEnv !== NodeEnvs.Test) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});
