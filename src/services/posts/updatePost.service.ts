import AppDataSource from "../../data-source";
import { Image } from "../../entities/image.entity";
import { Post } from "../../entities/post.entity";
import { IPostUpdateRequest } from "../../interfaces/posts.interface";
import { postResponseSerializer } from "../../serializers/post.serializers";

const updatePostService = async (
  reqData: IPostUpdateRequest,
  userId: string,
  postId: string
) => {
  const postsRepository = AppDataSource.getRepository(Post);
  const imagesRepository = AppDataSource.getRepository(Image);

  const { images, ...data } = reqData;

  const post = await postsRepository.findOne({
    where: {
      id: postId,
    },
    relations: {
      user: true,
      images: true,
      comments: true,
    },
  });

  if (images) {
    let imagesResponse = await Promise.all(
      images.map(async (img) => {
        const newImage = imagesRepository.create({
          imageLink: img.imageLink,
          post: post,
        });
        await imagesRepository.save(newImage);
        return newImage;
      })
    );
    post.images = [...post.images, ...imagesResponse];
  }

  const postUpdate = postsRepository.create({
    ...post,
    ...data,
  });
  await postsRepository.save(postUpdate);

  const dataResponse = postResponseSerializer.validate(postUpdate, {
    stripUnknown: true,
  });

  return dataResponse;
};

export default updatePostService;
