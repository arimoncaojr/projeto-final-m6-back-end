import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const ensureFieldsUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.body.id ||
    req.body.id === false ||
    req.body.createdAt ||
    req.body.createdAt === false ||
    req.body.updatedAt ||
    req.body.updatedAt === false ||
    req.body.isActive ||
    req.body.isActive === false ||
    req.body.address.id ||
    req.body.address.id === false ||
    req.body.address.createdAt ||
    req.body.address.createdAt === false ||
    req.body.address.updatedAt ||
    req.body.address.updatedAt === false
  ) {
    throw new AppError("You dont have authorization for edit this field", 401);
  }

  return next();
};
