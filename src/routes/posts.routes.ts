import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { postSerializer } from "../serializers/post.serializers";
import { commentRequestSerializer } from "../serializers/comment.serializers";
import { createPostController, deletePostController } from "../controllers/posts.controller";
import { createCommentController } from "../controllers/comments.controller";
import { checkUserIsAdvertiserMiddleware } from "../middlewares/checkUserIsAdvertiser.middleware";
import { postExistenceAndOwnershipMiddleware } from "../middlewares/postExistenceAndOwnership.middleware";

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
