import { Request, Response } from "express";
import { IUserRequest, IUserUpdate } from "../interfaces/user.interface";
import { createUserService } from "../services/users/createUser.service";
import { updateUserService } from "../services/users/updateUser.service";
import { listUserByIdService } from "../services/users/listUserById.service";

export const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

export const updateUserController = async (req: Request, res: Response) => {
  const userData: IUserUpdate = req.body;
  const userId: string = req.user.id;
  const newData = await updateUserService(userId, userData);

  return res.status(200).json(newData);
};

export const listUserByIdController = async (req: Request, res: Response) => {
  const userId: string = req.user.id;
  const userInfos = await listUserByIdService(userId);

  return res.status(200).json(userInfos);
};
