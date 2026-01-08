import { Request, Response } from "express";
import { postService } from "./post.service";
<<<<<<< HEAD
=======
import { error } from "node:console";
>>>>>>> dabbee6 (updated info)

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postService.createPost(req.body);

    res.status(201).json({
      data: result,
    });
  } catch (e: any) {
<<<<<<< HEAD
    res.status(404).json({ message: e.message });
=======
    res.status(404).json({
      message: "Post creation failed",
      error: e.message,
    });
>>>>>>> dabbee6 (updated info)
  }
};

export const postController = {
  createPost,
};
