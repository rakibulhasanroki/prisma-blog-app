import express, { Request, Response } from "express";
import { postRouter } from "./modules/post/post.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { CommentRouter } from "./modules/comment/comment.router";
import errorHandeler from "./middleware/errorHandeler";
import { notFound } from "./middleware/notFound";

const app = express();
app.use(express.json());

// cors
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:4000",
    credentials: true,
  })
);

// better-auth
app.all("/api/auth/*splat", toNodeHandler(auth));

// starting server response
app.get("/", (req: Request, res: Response) => {
  res.send("Prisma Blog App");
});

// route
app.use("/posts", postRouter);
app.use("/comments", CommentRouter);
app.use(notFound);
app.use(errorHandeler);

export default app;
