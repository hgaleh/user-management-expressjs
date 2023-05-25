import { HttpStatusCode } from '@src/utility/constant/http-status-code';

export class RouteError extends Error {
  status: HttpStatusCode;
  constructor(status: HttpStatusCode, message: string) {
    super(message);
    this.status = status;
  }
}
