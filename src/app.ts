import express, { Request, Response } from "express";
import { postRouter } from "./modules/post/post.router";
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Prisma Blog App");
});

app.use("/posts", postRouter);

export default app;
