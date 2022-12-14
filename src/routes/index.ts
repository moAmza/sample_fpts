import { Request, RequestHandler, Router } from "express";
import { initControllers } from "../controllers";
import { BaseError } from "../utilities/base-error";
import { initAuthRouter } from "./auth-router";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import { initUserRouter } from "./user-router";

export const handleRoute =
  <A extends BaseError, B>(
    task: (request: Request) => TE.TaskEither<A, B>
  ): RequestHandler =>
  async (req, res, next) => {
    const output = await task(req)();
    return E.isRight(output)
      ? res.status(200).json(output.right)
      : res.status(output.left.getStatusCode()).json(output.left.get());
  };

export const initRouters = (
  controllers: ReturnType<typeof initControllers>
) => {
  const router = Router();

  const routerInitiaizers: {
    [key in keyof ReturnType<typeof initControllers>]: Router;
  } = {
    auth: initAuthRouter(controllers.auth),
    user: initUserRouter(controllers.user),
  };

  (
    Object.keys(routerInitiaizers) as Array<keyof typeof routerInitiaizers>
  ).forEach((key) => router.use(`/${key}`, routerInitiaizers[key]));

  return router;
};
