import { z } from "zod";
import { validate } from "../utilities/validate-util";

export const userDto = {
  input: {
    getUserByUsername: validate({
      username: z.string(),
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
