import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import {
  postSerializer,
  postUpadteSerializer,
} from "../serializers/post.serializers";
import { commentRequestSerializer } from "../serializers/comment.serializers";
import {
  createCommentController,
  updateCommentController,
  deleteCommentController,
} from "../controllers/comments.controller";
import {
  delistPostController,
  updatePostController,
} from "../controllers/posts.controller";
import { checkUserIsAdvertiserMiddleware } from "../middlewares/checkUserIsAdvertiser.middleware";
import { postExistenceAndOwnershipMiddleware } from "../middlewares/postExistenceAndOwnership.middleware";
import {
  createPostController,
  listPostByIdController,
  listPostsController,
  deletePostController,
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

postsRoutes.patch(
  "/comments/:id",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(commentRequestSerializer),
  updateCommentController
);

postsRoutes.delete(
  "/comments/:id",
  ensureAuthMiddleware,
  deleteCommentController
);

postsRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  postExistenceAndOwnershipMiddleware,
  deletePostController
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
