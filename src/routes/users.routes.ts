import { Router } from "express";
import { createUserController } from "../controllers/users.controller";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { userRequestSerializer } from "../serializers/user.serializers";

export const userRoutes = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userRequestSerializer),
  createUserController
);
