import { Prisma, User } from "@prisma/client";
import { Err } from "../errors";
import * as TE from "fp-ts/TaskEither";
import * as O from "fp-ts/Option";

export const genUserRepo = (userModel: Prisma.UserDelegate<PrismaInfo>) => {
  return {
    create: (user: Omit<User, "id">) =>
      TE.tryCatch(
        async () => await userModel.create({ data: user }),
        Err.DatabaseError
      ),

    getByUsername: (username: string) =>
      TE.tryCatch(
        async () =>
          O.fromNullable(await userModel.findFirst({ where: { username } })),
        Err.DatabaseError
      ),

    getByEmail: (email: string) =>
      TE.tryCatch(
        async () =>
          O.fromNullable(await userModel.findFirst({ where: { email } })),
        Err.DatabaseError
      ),

    //   getByUsername: Task.of((username: string) =>
    //     userModel.findFirst({ where: { username } })
    //   ),

    //   updateProfileImage: Task.of(({ userId, profileImage }: any) =>
    //     userModel.update({
    //       where: { id: userId },
    //       data: { profileImage },
    //     })
    //   ),

    //   getPaginatedUsers: Task.of(
    //     ({
    //       limit,
    //       skip,
    //       search,
    //     }: {
    //       limit: number;
    //       skip: number;
    //       search: string;
    //     }) => userModel.findMany({ where: {}, skip, take: limit })
    //   ),
  };
};
