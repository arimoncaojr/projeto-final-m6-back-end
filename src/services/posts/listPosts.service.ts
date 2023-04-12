import { Post } from "../../entities/post.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import {
  listPostSerializer,
  postResponseSerializer,
} from "../../serializers/post.serializers";
import { IPostResponse } from "../../interfaces/posts.interface";

export const listPostsService = async (): Promise<IPostResponse[]> => {
  const postRepository = AppDataSource.getRepository(Post);

  const posts = await postRepository.find({
    relations: {
      user: true,
    },
  });

  if (posts.length == 0) {
    throw new AppError("Ainda não existe nenhum anúncio registrado", 200);
  }

  const postResponse = await listPostSerializer.validate(posts, {
    stripUnknown: true,
  });

  return postResponse;
};
