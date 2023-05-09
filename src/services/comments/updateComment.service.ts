import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Comment } from "../../entities/comment.entity";
import {
  ICommentRequest,
  ICommentResponse,
} from "../../interfaces/comment.interface";
import { commentResponseSerializer } from "../../serializers/comment.serializers";

export const updateCommentService = async (
  userId: string,
  commentId: string,
  commentData: ICommentRequest
): Promise<ICommentResponse> => {
  const commentRepo = AppDataSource.getRepository(Comment);

  const foundComment = await commentRepo.findOneBy({ id: commentId });

  if (!foundComment) {
    throw new AppError("Comment not found!", 404);
  }

  if (userId !== foundComment.userComment) {
    throw new AppError("You can't edit this comment!", 401);
  }

  const updateComment = commentRepo.create({ ...commentData });

  await commentRepo.save(updateComment);

  const commentResponse = await commentResponseSerializer.validate(
    updateComment,
    { stripUnknown: true }
  );

  return commentResponse;
};
