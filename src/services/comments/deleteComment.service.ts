import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comment.entity";
import { AppError } from "../../errors/AppError";

export const deleteCommentService = async (
  userId: string,
  commentId: string
) => {
  const commentRepo = AppDataSource.getRepository(Comment);

  const foundComment = await commentRepo.findOneBy({ id: commentId });

  if (!foundComment) {
    throw new AppError("Comment not found!", 404);
  }

  if (userId !== foundComment.userComment) {
    throw new AppError("You don't have authorization for this", 401);
  }

  commentRepo.delete(commentId);
};
