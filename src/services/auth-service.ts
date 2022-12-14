import { verifierDao, AuthDtoInputType } from "../daos/verifier-dao";
import { Err } from "../errors";
import { genUserRepo } from "../repos/user-repo";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/lib/function";
import { User } from "@prisma/client";
import { checkDuplicate, checkNotFound } from "../utilities/check-null";
import { genVerifierRepo } from "../repos/verifier-repo";
import { inspect } from "../utilities/inspect-fn";
import { userDao } from "../daos/user-dao";

type EmailAndPassword = { username: string; email: string };

export const genAuthService =
  (
    userRepo: ReturnType<typeof genUserRepo>,
    verifierRepo: ReturnType<typeof genVerifierRepo>
  ) =>
  (getService: GetServiceType<never>) => {
    const isRegisterInputUniqe = <B, A extends B & EmailAndPassword>(i: A) =>
      pipe(
        i.username,
        TE.of,
        TE.chain(userRepo.getByUsername),
        TE.chainW(checkDuplicate("username")),
        TE.map(() => i.email),
        TE.chainW(userRepo.getByEmail),
        TE.chainW(checkDuplicate("email")),
        TE.map(() => i)
      );

    const validatePassword = (inputPass: string) => (user: User) =>
      user.password === inputPass
        ? TE.right(user)
        : TE.left(Err.WrongInfoError("wrong password")());

    const validateVerifier = (input: AuthDtoInputType<"confirm">) =>
      pipe(
        verifierRepo.incrementCountByEmail(input.email),
        TE.chain(() => verifierRepo.getByEmail(input.email)),
        TE.chainW(checkNotFound("verifier")),
        TE.chainW((v) =>
          v.count > 3
            ? TE.left(Err.WrongInfoError("expired verifier")())
            : TE.right(v)
        ),
        TE.chain((v) =>
          v.code === input.code
            ? TE.right(v)
            : TE.left(Err.WrongInfoError("invalid code")())
        )
      );

    const generateJwt = (user: User): JWT => {
      return "asdfssaf" as JWT;
    };

    return {
      register: (input: AuthDtoInputType<"register">) =>
        pipe(
          input,
          TE.of,
          TE.chain(isRegisterInputUniqe),
          TE.map(verifierDao.create),
          TE.map(inspect),
          TE.chainW(verifierRepo.create)
        ),
      login: (input: AuthDtoInputType<"login">) =>
        pipe(
          input.username,
          TE.of,
          TE.chain(userRepo.getByUsername),
          TE.chainW(checkNotFound("user")),
          TE.chainW(validatePassword(input.password)),
          TE.map(generateJwt)
        ),
      confirm: (input: AuthDtoInputType<"confirm">) =>
        pipe(
          input,
          TE.of,
          TE.chain(validateVerifier),
          TE.map(userDao.create),
          TE.chainW(isRegisterInputUniqe),
          TE.chainW(userRepo.create),
          TE.map(generateJwt)
        ),
    };
  };
