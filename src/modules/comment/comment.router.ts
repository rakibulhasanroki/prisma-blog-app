import express from "express";
import auth, { UserRole } from "../../middleware/auth";
import { CommentController } from "./comment.controller";

const router = express.Router();

router.get("/author/:authorId", CommentController.getCommentByAuthorId);

router.get("/:commentId", CommentController.getCommentById);

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.USER),
  CommentController.createComment
);

router.delete(
  "/:commentId",
  auth(UserRole.ADMIN, UserRole.USER),
  CommentController.commentDeleteById
);

router.patch(
  "/:commentId",
  auth(UserRole.ADMIN, UserRole.USER),
  CommentController.updateComment
);

export const CommentRouter = router;
