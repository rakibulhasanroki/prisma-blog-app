import { Request, Response } from "express";
import { postService } from "./post.service";
import strict from "node:assert/strict";
import { PostStatus } from "../../../generated/prisma/enums";
import { string, toLowerCase } from "better-auth/*";
import paginationSort from "../../helper/paginationSorting";
import { UserRole } from "../../middleware/auth";

const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        message: "unauthorized",
      });
    }

    const postBody = req.body;
    const result = await postService.createPost(postBody, user.id);

    res.status(201).json({
      data: result,
    });
  } catch (e: any) {
    res.status(404).json({
      message: "Post creation failed",
      error: e.message,
    });
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    const searchType = typeof search === "string" ? search : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
        ? false
        : undefined
      : undefined;

    const status = req.query.status as PostStatus | undefined;
    const authorId = req.query.authorId as string | undefined;

    const { page, limit, skip, sortBy, sortOrder } = paginationSort(req.query);

    const result = await postService.getAllPost({
      search: searchType,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });

    res.status(200).json(result);
  } catch (e: any) {
    res.status(404).json({
      message: "Get all post failed",
      error: e,
    });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    // console.log(postId);
    if (!postId) {
      throw new Error("PostId is  required");
    }
    const result = await postService.getPostById(postId);

    res.status(200).json(result);
  } catch (e: any) {
    res.status(404).json({
      message: "Get  post by id  failed",
      error: e,
    });
  }
};

const getMyPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("user not found");
    }
    const result = await postService.getMyPost(user.id as string);

    res.status(200).json(result);
  } catch (e: any) {
    res.status(404).json({
      message: "Get my post failed",
      error: e,
    });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { postId } = req.params;
    const isAdmin = user?.role === UserRole.ADMIN;
    console.log(user, isAdmin);
    if (!user) {
      throw new Error("user not found");
    }
    const result = await postService.updatePost(
      postId as string,
      req.body,
      user.id,
      isAdmin
    );

    res.status(200).json(result);
  } catch (e: any) {
    const errorMessage = e instanceof Error ? e.message : "Post update failed";
    res.status(404).json({
      message: errorMessage,
      details: e,
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { postId } = req.params;
    const isAdmin = user?.role === UserRole.ADMIN;
    console.log(user, isAdmin);
    if (!user) {
      throw new Error("user not found");
    }
    const result = await postService.deletePost(
      postId as string,
      user.id,
      isAdmin
    );

    res.status(200).json(result);
  } catch (e: any) {
    const errorMessage = e instanceof Error ? e.message : "Post delete failed";
    res.status(404).json({
      message: errorMessage,
      details: e,
    });
  }
};

const getStats = async (req: Request, res: Response) => {
  try {
    const result = await postService.getStats();
    res.status(200).json(result);
  } catch (e: any) {
    const errorMessage =
      e instanceof Error ? e.message : " Stats fetched failed";
    res.status(404).json({
      message: errorMessage,
      details: e,
    });
  }
};
export const postController = {
  createPost,
  getAllPost,
  getPostById,
  getMyPost,
  updatePost,
  deletePost,
  getStats,
};
