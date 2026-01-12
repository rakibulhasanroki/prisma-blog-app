import { Request, Response } from "express";
import { CommentService } from "./comment.service";
import { CommentStatus } from "../../../generated/prisma/enums";

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
    const { content, status } = req.body;

    const updateBody: { content?: string; status?: CommentStatus } = {};
    if (content !== undefined) {
      updateBody.content = content;
    }

    if (status !== undefined) {
      if (req.user?.role !== "ADMIN") {
        return res.status(403).json({
          message: "Only admin can change status",
        });
      }
      updateBody.status = status;
    }

    const result = await CommentService.updateComment(
      commentId as string,
      authorId as string,
      updateBody
    );

    res.status(200).json({
      data: result,
    });
  } catch (e: any) {
    const errorMessage =
      e instanceof Error ? e.message : "Comment update failed";
    res.status(404).json({
      message: errorMessage,
      details: e,
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
