import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import {
  postSerializer,
  postUpadteSerializer,
} from "../serializers/post.serializers";
import { commentRequestSerializer } from "../serializers/comment.serializers";
import { createCommentController } from "../controllers/comments.controller";
import {
  delistPostController,
  updatePostController,
} from "../controllers/posts.controller";
import {
  createPostController,
  listPostByIdController,
  listPostsController,
} from "../controllers/posts.controller";
import ensureTokenIsPostOwnerMiddleware from "../middlewares/ensureTokenIsPostOwner.middleware";

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

postsRoutes.patch("/:id/delist", ensureAuthMiddleware, delistPostController);
postsRoutes.get("", listPostsController);

postsRoutes.get("/:id", listPostByIdController);

postsRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureTokenIsPostOwnerMiddleware,
  ensureDataIsValidMiddleware(postUpadteSerializer),
  updatePostController
);
