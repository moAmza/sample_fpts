import { BaseError } from "../utilities/base-error";

export class DatabaseError extends BaseError {
  protected type: "DATABASE_ERROR" = "DATABASE_ERROR";
  protected statusCode = 500;

  static of = (e: any) => {
    console.log("DATABASE ERROR: ", e);
    return new DatabaseError();
  };

  do = () => this;

  getMessage = () => "ارتباط با پایگاه داده قطع شده است.";
}
