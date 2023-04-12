import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";
import { AppError } from "../../errors/AppError";

export const listPostByIdService = async (id: string) => {
  const adsRepository = AppDataSource.getRepository(Post);

  const ads = await adsRepository.findOneBy({
    id: id,
  });

  if (ads) {
    return ads;
  }

  throw new AppError("Anúncio não encontrado", 404);
};
