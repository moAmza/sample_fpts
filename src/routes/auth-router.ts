import { Router } from "express";
import { taskEither } from "fp-ts";
import { handleRoute } from ".";
import { genAuthController } from "../controllers/auth-controller";

export const initAuthRouter = (
  authController: ReturnType<typeof genAuthController>
) => {
  const router = Router();

  router.post("/login", handleRoute(authController.login));
  router.post("/confirm", handleRoute(authController.confirm));
  router.post("/register", handleRoute(authController.register));

  return router;
};
