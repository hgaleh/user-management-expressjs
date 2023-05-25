import { HttpStatusCodes } from '@src/utility/constant/http-status-codes';

export class RouteError extends Error {
  status: HttpStatusCodes;
  constructor(status: HttpStatusCodes, message: string) {
    super(message);
    this.status = status;
  }
}
