import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Post } from "../../entities/post.entity";
import { Comment } from "../../entities/comment.entity";
import {
  ICommentRequest,
  ICommentResponse,
} from "../../interfaces/comment.interface";
import { commentResponseSerializer } from "../../serializers/comment.serializers";

export const createCommentService = async (
  commentData: ICommentRequest,
  userId: string,
  postId: string
): Promise<ICommentResponse> => {
  const commentRepository = AppDataSource.getRepository(Comment);
  const postRepository = AppDataSource.getRepository(Post);

  const existingPost = await postRepository.findOneBy({ id: postId });

  if (!existingPost) {
    throw new AppError("Post not found!", 404);
  }

  const comment = commentRepository.create({
    ...commentData,
    userComment: userId,
    post: existingPost,
  });

  await commentRepository.save(comment);

  const commentResponse = await commentResponseSerializer.validate(comment, {
    stripUnknown: true,
  });

  return { ...commentResponse, post: existingPost.id };
};
