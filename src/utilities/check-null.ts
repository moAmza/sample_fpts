import * as TE from "fp-ts/TaskEither";
import * as O from "fp-ts/Option";
import { Err } from "../errors";
import { pipe } from "fp-ts/lib/function";
import { DuplicateError } from "../errors/duplicate-error";

export const checkDuplicate =
  (name: string) =>
  <B>(opt: O.Option<B>): TE.TaskEither<DuplicateError, null> =>
    pipe(
      O.getOrElseW(() => null)(opt)
        ? TE.left(Err.DuplicateError(name)())
        : TE.right(null)
    );

export const checkNotFound =
  (name: string) =>
  <B>(opt: O.Option<B>) =>
    TE.fromOption(Err.NotFoundError(name))(opt);
