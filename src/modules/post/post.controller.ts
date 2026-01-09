import { Request, Response } from "express";
import { postService } from "./post.service";

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

export const postController = {
  createPost,
};
