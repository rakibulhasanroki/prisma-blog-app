import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postService.createPost(req.body);

    res.status(201).json({
      data: result,
    });
  } catch (e: any) {
    res.status(404).json({ message: e.message });

    res.status(404).json({
      message: "Post creation failed",
      error: e.message,
    });
  }
};

export const postController = {
  createPost,
};
