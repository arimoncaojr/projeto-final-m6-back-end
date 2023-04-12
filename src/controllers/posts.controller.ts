import { Request, Response } from "express";
import { IPostRequest } from "../interfaces/posts.interface";
import createPostService from "../services/posts/createPost.service";
import { listPostsService } from "../services/posts/listPosts.service";
import { listPostByIdService } from "../services/posts/listPostById.service";

export const createPostController = async (req: Request, res: Response) => {
  const reqData: IPostRequest = req.body;
  const user = req.user;
  const data = await createPostService(reqData, user);
  return res.status(201).json(data);
};

export const listPostsController = async (req: Request, res: Response) => {
  const posts = await listPostsService();
  return res.json(posts);
};

export const listPostByIdController = async (req: Request, res: Response) => {
  const ads = await listPostByIdService(req.params.id);
  return res.status(200).json(ads);
};
