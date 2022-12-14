import { User, Verifier } from "@prisma/client";
import { authDto } from "../dtos/auth-dto";

export type VerifierUserInfoType = {
  [key in keyof AuthDtoInputType<"register">]: string;
};

export type AuthDtoInputType<k extends keyof typeof authDto.input> =
  DtoInputType<typeof authDto.input, k>;

export const verifierDao = {
  create: (input: AuthDtoInputType<"register">): Omit<Verifier, "id"> => ({
    code: ~~(Math.random() * 10000),
    count: 0,
    email: input.email,
    userInfo: {
      ...input,
      birthday: input.birthday.toString(),
    } as VerifierUserInfoType,
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
};
