import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/user.interface";
import { createUserService } from "../services/users/createUser.service";
import { updateUserService } from "../services/users/updateUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

export const updateUserController = async (req: Request, res: Response) => {
  const userData: Partial<IUserRequest> = req.body;
  const userId: string = req.params.id;
  const newData = await updateUserService(userId, userData);

  return res.status(200).json(newData);
};
