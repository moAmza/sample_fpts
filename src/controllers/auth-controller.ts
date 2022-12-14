import { ReqTasks } from ".";
import { authDto } from "../dtos/auth-dto";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "ramda";

export const genAuthController = (
  authService: ReturnType<GetServiceType<"auth">>
) => ({
  register: pipe(
    ReqTasks.getBody,
    TE.chain(authDto.input.register),
    TE.chainW(authService.register),
    TE.map(authDto.output.status(true))
  ),
  login: pipe(
    ReqTasks.getBody,
    TE.chain(authDto.input.login),
    TE.chainW(authService.login),
    TE.map(authDto.output.label("jwt"))
  ),
  confirm: pipe(
    ReqTasks.getBody,
    TE.chain(authDto.input.confirm),
    TE.chainW(authService.confirm),
    TE.map(authDto.output.label("jwt"))
  ),
});
