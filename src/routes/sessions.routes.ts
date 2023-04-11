import { Router } from "express";
import { sessionLoginController } from "../controllers/session.controller";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { loginSessionSerializer } from "../serializers/session.serializers";

export const sessionRoutes = Router()

sessionRoutes.post("", ensureDataIsValidMiddleware(loginSessionSerializer), sessionLoginController)