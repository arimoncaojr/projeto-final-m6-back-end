import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Post } from "../entities/post.entity";
import { validate } from "uuid";
import { AppError } from "../errors/AppError";

const ensureTokenIsPostOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postsRepository = AppDataSource.getRepository(Post);

  const postId = req.params.id;

  const validateId = validate(postId);

  if (!validateId) {
    throw new AppError("This uuid is invalid!", 400);
  }

  const findPost = await postsRepository.findOne({
    where: {
      id: postId,
    },
    relations: {
      user: true,
    },
  });

  if (!findPost) {
    throw new AppError("Post not found!", 404);
  }

  if (findPost.user.id !== req.user.id) {
    throw new AppError("Missing authorization!", 403);
  }

  next();
};

export default ensureTokenIsPostOwnerMiddleware;
