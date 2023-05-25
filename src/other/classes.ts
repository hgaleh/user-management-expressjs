/**
 * Miscellaneous shared classes go here.
 */

import {HttpStatusCodes} from '@src/constants/http-status-codes';


/**
 * Error with status code and message
 */
export class RouteError extends Error {
  status: HttpStatusCodes;
  constructor(status: HttpStatusCodes, message: string) {
    super(message);
    this.status = status;
  }
}
