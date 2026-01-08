import express, { Request, Response } from "express";
import { postRouter } from "./modules/post/post.router";
<<<<<<< HEAD
const app = express();
app.use(express.json());

=======
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:4000",
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

>>>>>>> dabbee6 (updated info)
app.get("/", (req: Request, res: Response) => {
  res.send("Prisma Blog App");
});

app.use("/posts", postRouter);

export default app;
