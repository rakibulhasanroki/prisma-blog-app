import { Request, Response } from "express";
import { CommentService } from "./comment.service";

const createComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("unauthorized");
    }
    req.body.authorId = user.id;
    const result = await CommentService.createComment(req.body);

    res.status(201).json({
      data: result,
    });
  } catch (e: any) {
    res.status(404).json({
      message: "Comment creation failed",
      error: e,
    });
  }
};

const getCommentById = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    if (!commentId) {
      throw new Error("Comment id not found");
    }
    const result = await CommentService.getCommentById(commentId);

    res.status(200).json({
      data: result,
    });
  } catch (e: any) {
    res.status(404).json({
      message: "Comment fetch failed",
      error: e,
    });
  }
};

const getCommentByAuthorId = async (req: Request, res: Response) => {
  try {
    const { authorId } = req.params;
    if (!authorId) {
      throw new Error("Comment id not found");
    }
    const result = await CommentService.getCommentByAuthorId(authorId);

    res.status(200).json({
      data: result,
    });
  } catch (e: any) {
    res.status(404).json({
      message: "Comment fetch failed",
      error: e,
    });
  }
};

const commentDeleteById = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const authorId = req.user?.id;

    const result = await CommentService.commentDeleteById(
      commentId as string,
      authorId as string
    );

    res.status(200).json({
      data: result,
    });
  } catch (e: any) {
    res.status(404).json({
      message: "Comment delete failed",
      error: e,
    });
  }
};

const updateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const authorId = req.user?.id;

    const result = await CommentService.updateComment(
      commentId as string,
      authorId as string,
      req.body
    );

    res.status(200).json({
      data: result,
    });
  } catch (e: any) {
    res.status(404).json({
      message: "Comment update failed",
      error: e,
    });
  }
};

export const CommentController = {
  createComment,
  getCommentById,
  getCommentByAuthorId,
  commentDeleteById,
  updateComment,
};
