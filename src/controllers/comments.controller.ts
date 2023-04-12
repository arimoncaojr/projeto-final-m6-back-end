import { Request, Response } from "express";
import { ICommentRequest } from "../interfaces/comment.interface";
import { createCommentService } from "../services/comments/createComment.service";

export const createCommentController = async (req: Request, res: Response) => {
  const commetData: ICommentRequest = req.body;
  const userId: string = req.user.id;
  const postId: string = req.params.id;
  const newComment = await createCommentService(commetData, userId, postId);

  return res.status(201).json(newComment);
};