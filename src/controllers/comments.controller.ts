import { Request, Response } from "express";
import { ICommentRequest } from "../interfaces/comment.interface";
import { createCommentService } from "../services/comments/createComment.service";
import { updateCommentService } from "../services/comments/updateComment.service";
import { deleteCommentService } from "../services/comments/deleteComment.service";

export const createCommentController = async (req: Request, res: Response) => {
  const commetData: ICommentRequest = req.body;
  const userId: string = req.user.id;
  const postId: string = req.params.id;
  const newComment = await createCommentService(commetData, userId, postId);

  return res.status(201).json(newComment);
};

export const updateCommentController = async (req: Request, res: Response) => {
  const commentData: ICommentRequest = req.body;
  const userId: string = req.user.id;
  const commentId: string = req.params.id;

  const updateComment = await updateCommentService(
    userId,
    commentId,
    commentData
  );

  return res.status(200).json(updateComment);
};

export const deleteCommentController = async (req: Request, res: Response) => {
  const userId: string = req.user.id;
  const commentId: string = req.params.id;

  await deleteCommentService(userId, commentId);

  return res.status(204).json({});
};
