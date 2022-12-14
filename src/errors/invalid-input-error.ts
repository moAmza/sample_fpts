import { BaseError } from "../utilities/base-error";

export class InvalidInputError extends BaseError {
  protected type: "INVALID_INPUT_ERROR" = "INVALID_INPUT_ERROR";
  protected statusCode = 400;

  constructor(errorData: any) {
    super();
    this.errorData = errorData;
  }

  static of = (data: any) => new InvalidInputError(data);

  do = () => this;

  getMessage = () => "ورودی نامعتبر است";
}
