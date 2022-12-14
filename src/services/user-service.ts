import { pipe } from "fp-ts/lib/function";
import { genUserRepo } from "../repos/user-repo";
import * as TE from "fp-ts/TaskEither";
import { checkNotFound } from "../utilities/check-null";
import { userDao } from "../daos/user-dao";

export const genUserService =
  (userRepo: ReturnType<typeof genUserRepo>) =>
  (getService: GetServiceType<"auth">) => {
    return {
      getUserByUsername: (i: { username: string }) =>
        pipe(
          i.username,
          TE.of,
          TE.chain(userRepo.getByUsername),
          TE.chainW(checkNotFound("user")),
          TE.map(userDao.output.longUser)
        ),
    };
  };
