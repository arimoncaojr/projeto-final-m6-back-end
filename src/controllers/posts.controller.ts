import { Request, Response } from "express";
import { IPostRequest } from "../interfaces/posts.interface";
import createPostService from "../services/posts/createPost.service";

export const createPostController = async (req: Request, res: Response) => {
  const reqData: IPostRequest = req.body;
  const user = req.user;
  const data = await createPostService(reqData, user);
  return res.status(201).json(data);
};

export const deletePostController = async (req: Request, res: Response) => {

  return res.status(204).json()
}
