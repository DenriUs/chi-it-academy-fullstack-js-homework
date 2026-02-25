import type { HttpStatusCode } from 'axios';

export class ApiError extends Error {
  public error: unknown;
  public statusCode: HttpStatusCode;

  public constructor(message: string, error: unknown, statusCode: HttpStatusCode) {
    super(message);
    this.error = error;
    this.statusCode = statusCode;
  }
}
