import { Router } from "express";
import {
  createUserController,
  updateUserController,
} from "../controllers/users.controller";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureUserLoggedMiddleWare from "../middlewares/ensureUserLogged.middleware";
import {
  userRequestSerializer,
  userUpdateSerializer,
} from "../serializers/user.serializers";

export const userRoutes = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userRequestSerializer),
  createUserController
);

userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureUserLoggedMiddleWare,
  ensureDataIsValidMiddleware(userUpdateSerializer),
  updateUserController
);
