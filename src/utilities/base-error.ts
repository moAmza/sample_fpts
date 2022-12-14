type ErrorTypes =
  | "DATABASE_ERROR"
  | "INVALID_INPUT_ERROR"
  | "NOT_FOUND_ERROR"
  | "DUPLICATE_ERROR"
  | "WRONG_INFO";

export abstract class BaseError {
  protected abstract type: ErrorTypes;
  protected abstract statusCode: number;
  protected errorData: any;

  protected constructor() {}

  abstract do: () => this;
  abstract getMessage: () => string;

  getStatusCode = () => this.statusCode;

  get = () => ({
    statusCode: this.statusCode,
    errorType: this.type,
    message: this.getMessage(),
    errorData: this.errorData,
  });
}
