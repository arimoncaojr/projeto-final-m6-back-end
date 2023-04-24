import { Router } from "express";
import {
  createUserController,
  updateUserController,
  listUserByIdController,
  deleteUserController,
  resetPassUserController,
  resetPassByTokenController,
} from "../controllers/users.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import {
  userRequestSerializer,
  userUpdateSerializer,
  userForgotRequestSerializer,
  userFogotPassSerializer,
} from "../serializers/user.serializers";

export const userRoutes = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userRequestSerializer),
  createUserController
);

userRoutes.patch(
  "/profile",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(userUpdateSerializer),
  updateUserController
);

userRoutes.get("/profile", ensureAuthMiddleware, listUserByIdController);

userRoutes.delete("/profile", ensureAuthMiddleware, deleteUserController);

userRoutes.post(
  "/forgot",
  ensureDataIsValidMiddleware(userForgotRequestSerializer),
  resetPassUserController
);

userRoutes.post(
  "/reset/:token",
  ensureDataIsValidMiddleware(userFogotPassSerializer),
  resetPassByTokenController
);
