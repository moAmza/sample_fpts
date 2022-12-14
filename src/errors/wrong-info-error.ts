import { BaseError } from "../utilities/base-error";

export class WrongInfoError extends BaseError {
  protected type: "WRONG_INFO" = "WRONG_INFO";
  protected statusCode = 400;

  constructor(private message: string) {
    super();
  }

  static of = (message: string) => () => new WrongInfoError(message);

  do = () => this;

  getMessage = () => this.message;
}
