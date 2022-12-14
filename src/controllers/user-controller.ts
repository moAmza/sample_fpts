import { ReqTasks } from ".";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "ramda";
import { userDto } from "../dtos/user-dto";
import { inspect } from "../utilities/inspect-fn";

export const genUserController = (
  userService: ReturnType<GetServiceType<"user">>
) => ({
  getUserByUsername: pipe(
    ReqTasks.getParams,
    TE.chain(userDto.input.getUserByUsername),
    TE.chainW(userService.getUserByUsername),
    TE.map(userDto.output.label("user"))
  ),
});
