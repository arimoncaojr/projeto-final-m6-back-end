import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";
import { AppError } from "../../errors/AppError";
import { IPostResponse } from "../../interfaces/posts.interface";
import {
  listPostSerializer,
  postResponseSerializer,
} from "../../serializers/post.serializers";

export const listPostByIdService = async (
  id: string
): Promise<IPostResponse> => {
  const postRepository = AppDataSource.getRepository(Post);

  const post = await postRepository.findOne({
    where: { id: id },
    relations: {
      user: true,
      images: true,
      comments: true,
    },
  });

  if (post) {
    const postResponse = await postResponseSerializer.validate(post, {
      stripUnknown: true,
    });

    return postResponse;
  }

  throw new AppError("Anúncio não encontrado", 404);
};
