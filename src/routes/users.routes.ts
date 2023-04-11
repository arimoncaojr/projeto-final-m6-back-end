import { Router } from "express";
import {
  createUserController,
  updateUserController,
  listUserByIdController,
} from "../controllers/users.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureFieldsUserMiddleware } from "../middlewares/ensureFieldsUser.middleware";
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
  "",
  ensureAuthMiddleware,
  ensureFieldsUserMiddleware,
  ensureDataIsValidMiddleware(userUpdateSerializer),
  updateUserController
);

userRoutes.get("/profile", ensureAuthMiddleware, listUserByIdController);
