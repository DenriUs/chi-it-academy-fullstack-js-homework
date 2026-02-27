export class ApiError extends Error {
  public error: unknown;
  public statusCode: number;

  public constructor(message: string, error: unknown, statusCode: number) {
    super(message);
    this.error = error;
    this.statusCode = statusCode;
  }
}
