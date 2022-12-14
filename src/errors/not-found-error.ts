import { BaseError } from "../utilities/base-error";

export class NotFoundError extends BaseError {
  protected type: "NOT_FOUND_ERROR" = "NOT_FOUND_ERROR";
  protected statusCode = 404;

  constructor(private field: string) {
    super();
  }

  static of = (field: string) => () => new NotFoundError(field);

  do = () => this;

  getMessage = () => `${this.field} یافت نشد`;
}
