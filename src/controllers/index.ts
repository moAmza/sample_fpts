import { Request } from "express";
import * as TE from "fp-ts/TaskEither";
import { genAuthController } from "./auth-controller";
import { genUserController } from "./user-controller";

export const initControllers = (services: AllServicesType) => ({
  auth: genAuthController(services.auth),
  user: genUserController(services.user),
});

type ExpressReq = Request;

export const ReqTasks = {
  getBody: (i: ExpressReq) => TE.of(i.body),
  getQuery: (i: ExpressReq) => TE.of(i.query),
  getParams: (i: ExpressReq) => TE.of(i.params),
};
