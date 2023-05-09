import { Request, Response } from "express";
import {
  IUserRequest,
  IUserUpdate,
  IUserForgotRequest,
  IUserForgotPass,
} from "../interfaces/user.interface";
import { createUserService } from "../services/users/createUser.service";
import { updateUserService } from "../services/users/updateUser.service";
import { listUserByIdService } from "../services/users/listUserById.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import {
  resetPassUserService,
  resetPassByTokenService,
} from "../services/users/resetPassUser.service";
import { authenticationTokenSendEmailService } from "../services/users/authenticationTokenSendEmail.Service";

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

export const listProfileByIdController = async (
  req: Request,
  res: Response
) => {
  const userId: string = req.params.id;
  const userInfos = await listUserByIdService(userId);

  return res.status(200).json(userInfos);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const userId: string = req.user.id;
  await deleteUserService(userId);

  return res.status(204).json({});
};

export const resetPassUserController = async (req: Request, res: Response) => {
  const userData: IUserForgotRequest = req.body;
  await resetPassUserService(userData);

  return res.status(200).json({ message: "E-mail de recuperação enviado" });
};

export const resetPassByTokenController = async (
  req: Request,
  res: Response
) => {
  const token: string = req.params.token;
  const userData: IUserForgotPass = req.body;

  await resetPassByTokenService(token, userData);

  return res.status(200).json({ message: "Senha atualizada com sucesso" });
};

export const authenticationTokenSendEmailController = async (
  req: Request,
  res: Response
) => {
  const token = req.params.token;
  await authenticationTokenSendEmailService(token);
  return res.status(200).json({ message: "token autenticado" });
};
