import { z } from "zod";
import { validate } from "../utilities/validate-util";

export const authDto = {
  input: {
    register: validate({
      username: z.string(),
      password: z.string(),
      email: z.string(),
      birthday: z.string().transform((x) => new Date(x)),
      country: z.string(),
      firstname: z.string(),
      lastname: z.string(),
    }),

    login: validate({
      username: z.string(),
      password: z.string(),
    }),

    confirm: validate({
      email: z.string().email(),
      code: z.number(),
    }),
  },
  output: {
    label:
      (name: string) =>
      <A>(val: A) => ({ [name]: val }),
    default: <A>(out: A) => out,
    status: (status: boolean) => () => ({ status }),
  },
};
