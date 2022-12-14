import { NotFoundError } from "./not-found-error";
import { InvalidInputError } from "./invalid-input-error";
import { DatabaseError } from "./database-error";
import { DuplicateError } from "./duplicate-error";
import { WrongInfoError } from "./wrong-info-error";
type ErrorOpts = {};

const genERR = (opts: ErrorOpts) => ({
  NotFoundError: NotFoundError.of,
  DuplicateError: DuplicateError.of,
  InvalidInputError: InvalidInputError.of,
  DatabaseError: DatabaseError.of,
  WrongInfoError: WrongInfoError.of,
});

export const Err = genERR({});
