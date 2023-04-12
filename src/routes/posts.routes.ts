import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { postSerializer } from "../serializers/post.serializers";
import { commentRequestSerializer } from "../serializers/comment.serializers";
import { createPostController } from "../controllers/posts.controller";
import { createCommentController } from "../controllers/comments.controller";
import { delistPostController } from "../controllers/posts.controller";

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
