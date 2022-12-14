import { z, ZodRawShape } from "zod";
import * as TE from "fp-ts/TaskEither";
import { Err } from "../errors";

export const validate =
  <A extends ZodRawShape>(zodObj: A) =>
  (i: any) =>
    TE.tryCatchK(
      async () => await z.object(zodObj).strict().strip().parseAsync(i),
      Err.InvalidInputError
    )();
