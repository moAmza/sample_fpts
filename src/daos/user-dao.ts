import { User, Verifier } from "@prisma/client";
import { authDto } from "../dtos/auth-dto";
import { VerifierUserInfoType } from "./verifier-dao";

export type OutputTypeShortUser = {
  username: string;
  firstname: string;
  lastname: string;
};

export interface OutputTypeLongUser extends OutputTypeShortUser {
  email: string;
}

export const userDao = {
  create: (ver: Verifier): Omit<User, "id"> => ({
    ...(ver.userInfo as VerifierUserInfoType),
    birthday: new Date((ver.userInfo as VerifierUserInfoType).birthday),
    profileImage: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }),

  output: {
    shortUser: (user: User): OutputTypeShortUser => ({
      username: user.username,
      lastname: user.lastname,
      firstname: user.firstname,
    }),
    longUser: (user: User): OutputTypeLongUser => ({
      username: user.username,
      lastname: user.lastname,
      firstname: user.firstname,
      email: user.email,
    }),
  },
};
