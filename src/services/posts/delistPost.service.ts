import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Post } from "../../entities/post.entity";
import { User } from "../../entities/user.entity";
import { IPostResponse } from "../../interfaces/posts.interface";
import { validate as uuidValidate } from "uuid";
import { postResponseSerializer } from "../../serializers/post.serializers";

export const delistPostService = async (
  postId: string,
  userId: string
): Promise<IPostResponse> => {
  if (!uuidValidate(postId)) {
    throw new AppError("Invalid post ID", 400);
  }

  const userRepository = AppDataSource.getRepository(User);
  const postRepository = AppDataSource.getRepository(Post);

  const existingUser = await userRepository.findOneBy({ id: userId });
  const existingPost = await postRepository.findOne({
    where: { id: postId },
    relations: { user: true, images: true, comments: true },
  });

  if (!existingUser) {
    throw new AppError("User not found!", 404);
  }

  if (!existingPost) {
    throw new AppError("Post not found!", 404);
  }

  if (existingPost.user.id !== userId) {
    throw new AppError("You don't have authorization!", 401);
  }

  if (!existingPost.isActive) {
    throw new AppError("You post already delist!", 409);
  }

  const delistPost = postRepository.create({
    ...existingPost,
    isActive: false,
  });

  await postRepository.save(delistPost);

  const postResponse = await postResponseSerializer.validate(delistPost, {
    stripUnknown: true,
  });

  return postResponse;
};
