import { Request, Response } from "express";
import { IPostRequest } from "../interfaces/posts.interface";
import createPostService from "../services/posts/createPost.service";
import { delistPostService } from "../services/posts/delistPost.service";

export const createPostController = async (req: Request, res: Response) => {
  const reqData: IPostRequest = req.body;
  const user = req.user;
  const data = await createPostService(reqData, user);
  return res.status(201).json(data);
};

export const delistPostController = async (req: Request, res: Response) => {
  const postId: string = req.params.id;
  const userId: string = req.user.id;
  const data = await delistPostService(postId, userId);

  return res.status(200).json(data);
};
