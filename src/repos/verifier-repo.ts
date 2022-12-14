import { Prisma, Verifier } from "@prisma/client";
import { Err } from "../errors";
import * as TE from "fp-ts/TaskEither";
import * as O from "fp-ts/Option";

export const genVerifierRepo = (model: Prisma.VerifierDelegate<PrismaInfo>) => {
  return {
    create: (data: Omit<Verifier, "id">) =>
      TE.tryCatch(
        async () =>
          await model.create({
            data: {
              ...data,
              userInfo: data.userInfo ? data.userInfo : Prisma.JsonNull,
            },
          }),
        Err.DatabaseError
      ),

    getByEmail: (email: string) =>
      TE.tryCatch(
        async () =>
          O.fromNullable(
            await model.findFirst({
              where: { email },
              orderBy: { createdAt: "desc" },
            })
          ),
        Err.DatabaseError
      ),

    incrementCountByEmail: (email: string) =>
      TE.tryCatch(
        async () =>
          await model.updateMany({
            where: { email },
            data: { count: { increment: 1 } },
          }),
        Err.DatabaseError
      ),
  };
};
