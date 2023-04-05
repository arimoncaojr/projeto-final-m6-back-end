import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import "dotenv/config";

const ensureUserLoggedMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.id !== req.params.id) {
    throw new AppError("You don't have authorization!", 401);
  }

  return next();
};

export default ensureUserLoggedMiddleWare;
