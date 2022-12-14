import { BaseError } from "../utilities/base-error";

export class DuplicateError extends BaseError {
  protected type: "DUPLICATE_ERROR" = "DUPLICATE_ERROR";
  protected statusCode = 404;

  constructor(private field: string) {
    super();
  }

  static of = (field: string) => () => new DuplicateError(field);

  do = () => this;

  getMessage = () => `${this.field} یافت نشد`;
}
