import AppDataSource from "../../data-source";
import { Image } from "../../entities/image.entity";
import { Post } from "../../entities/post.entity";
import { User } from "../../entities/user.entity";
import { IPostRequest } from "../../interfaces/posts.interface";
import { postResponseSerializer } from "../../serializers/post.serializers";

const createPostService = async (reqData: IPostRequest, user) => {
  const imagesRepository = AppDataSource.getRepository(Image);
  const usersRepository = AppDataSource.getRepository(User);
  const postsRepository = AppDataSource.getRepository(Post);

  const images = reqData.images;

  const price = parseInt(reqData.price);
  const priceFiper = parseInt(reqData.tablePriceFiper);

  const findUser = await usersRepository.findOneBy({
    id: user.id,
  });

  const dataPost = {
    ...reqData,
    isGoodPurchase: false,
  };

  if ((price / priceFiper) * 100 > 95) {
    dataPost.isGoodPurchase = false;
  } else {
    dataPost.isGoodPurchase = true;
  }

  const newPost = postsRepository.create({
    ...dataPost,
    user: findUser,
  });

  const postSaved = await postsRepository.save(newPost);

  if (images) {
    let imagesResponse = await Promise.all(
      images.map(async (img) => {
        const newImage = imagesRepository.create({
          imageLink: img.imageLink,
          post: postSaved,
        });
        await imagesRepository.save(newImage);
        return newImage;
      })
    );
    postSaved.images = imagesResponse;
  }

  const postResponse = await postResponseSerializer.validate(newPost, {
    stripUnknown: true,
  });

  return postResponse;
};

export default createPostService;
