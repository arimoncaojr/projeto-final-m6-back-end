import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { postSerializer } from "../serializers/post.serializers";
import { commentRequestSerializer } from "../serializers/comment.serializers";
import { createCommentController } from "../controllers/comments.controller";
import { checkUserIsAdvertiserMiddleware } from "../middlewares/checkUserIsAdvertiser.middleware";
import { postExistenceAndOwnershipMiddleware } from "../middlewares/postExistenceAndOwnership.middleware";
import { delistPostController } from "../controllers/posts.controller";
import {
  createPostController,
  listPostByIdController,
  listPostsController,
  deletePostController
} from "../controllers/posts.controller";


export const postsRoutes = Router();

postsRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(postSerializer),
  createPostController
);

postsRoutes.post(
  "/:id/comments",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(commentRequestSerializer),
  createCommentController
);

postsRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  checkUserIsAdvertiserMiddleware,
  postExistenceAndOwnershipMiddleware,
  deletePostController
)

postsRoutes.patch("/:id/delist", ensureAuthMiddleware, delistPostController);
postsRoutes.get("", listPostsController);

postsRoutes.get("/:id", listPostByIdController);

