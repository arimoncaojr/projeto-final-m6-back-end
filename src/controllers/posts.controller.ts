import { Request, Response } from "express";
import { IPostRequest } from "../interfaces/posts.interface";
import createPostService from "../services/posts/createPost.service";
import { deletePostService } from "../services/posts/deletePost.service";
import { delistPostService } from "../services/posts/delistPost.service";
import { listPostsService } from "../services/posts/listPosts.service";
import { listPostByIdService } from "../services/posts/listPostById.service";


export const createPostController = async (req: Request, res: Response) => {
  const reqData: IPostRequest = req.body;
  const user = req.user;
  const data = await createPostService(reqData, user);
  return res.status(201).json(data);
};


export const deletePostController = async (req: Request, res: Response) => {
  const idPost = req.params.id
  await deletePostService(idPost)
  return res.status(204).json({})
}

export const delistPostController = async (req: Request, res: Response) => {
  const postId: string = req.params.id;
  const userId: string = req.user.id;
  const data = await delistPostService(postId, userId);

  return res.status(200).json(data);
};

export const listPostsController = async (req: Request, res: Response) => {
  const posts = await listPostsService();
  return res.json(posts);
};

export const listPostByIdController = async (req: Request, res: Response) => {
  const ads = await listPostByIdService(req.params.id);
  return res.status(200).json(ads);
};

