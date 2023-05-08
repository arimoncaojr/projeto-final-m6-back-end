import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Post } from "../../entities/post.entity";
import { Comment } from "../../entities/comment.entity";
import {
  ICommentRequest,
  ICommentResponse,
} from "../../interfaces/comment.interface";
import { validate as uuidValidate } from "uuid";
import { User } from "../../entities/user.entity";

export const createCommentService = async (
  commentData: ICommentRequest,
  userId: string,
  postId: string
): Promise<ICommentResponse> => {
  if (!uuidValidate(postId)) {
    throw new AppError("Invalid post ID!", 400);
  }

  const commentRepository = AppDataSource.getRepository(Comment);
  const postRepository = AppDataSource.getRepository(Post);
  const usersRepository = AppDataSource.getRepository(User);

  const findUser = await usersRepository.findOneBy({
    id: userId,
  });

  const existingPost = await postRepository.findOneBy({ id: postId });

  if (!existingPost) {
    throw new AppError("Post not found!", 404);
  }

  const comment = commentRepository.create({
    ...commentData,
    userComment: findUser.id,
    post: existingPost,
  });

  await commentRepository.save(comment);

  return { ...comment, post: existingPost.id };
};
