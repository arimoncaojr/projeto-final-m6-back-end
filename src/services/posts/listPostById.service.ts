import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";
import { AppError } from "../../errors/AppError";

export const listPostByIdService = async (id: string) => {
  const postRepository = AppDataSource.getRepository(Post);

  const posts = await postRepository.findOne({
    where: { id: id },
    relations: {
      user: true,
      images: true,
      comments: true,
    },
  });

  if (posts) {
    return posts;
  }

  throw new AppError("Anúncio não encontrado", 404);
};
