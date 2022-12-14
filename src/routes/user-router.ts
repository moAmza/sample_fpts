import { Router } from "express";
import { handleRoute } from ".";
import { genUserController } from "../controllers/user-controller";

export const initUserRouter = (
  userController: ReturnType<typeof genUserController>
) => {
  const router = Router();

  router.get("/:username", handleRoute(userController.getUserByUsername));

  return router;
};
