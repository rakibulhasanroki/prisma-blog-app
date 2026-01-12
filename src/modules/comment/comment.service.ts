import { title } from "node:process";
import { prisma } from "../../lib/prisma";
import { CommentStatus } from "../../../generated/prisma/enums";

const createComment = async (payload: {
  content: string;
  authorId: string;
  postId: string;
  parentId?: string;
}) => {
  if (payload.postId) {
    await prisma.post.findUniqueOrThrow({
      where: {
        id: payload.postId,
      },
    });
  }
  if (payload.parentId) {
    await prisma.comment.findUniqueOrThrow({
      where: {
        id: payload.parentId,
      },
    });
  }
  return await prisma.comment.create({
    data: payload,
  });
};

const getCommentById = async (id: string) => {
  return await prisma.comment.findUnique({
    where: {
      id,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          views: true,
        },
      },
    },
  });
};

const getCommentByAuthorId = async (authorId: string) => {
  return await prisma.comment.findMany({
    where: {
      authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          views: true,
        },
      },
    },
  });
};

const commentDeleteById = async (commentId: string, authorId: string) => {
  const commentData = await prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId,
    },
    select: {
      id: true,
    },
  });
  if (!commentData) {
    throw new Error("Invalid input");
  }
  return await prisma.comment.delete({
    where: {
      id: commentData.id,
    },
  });
};

const updateComment = async (
  commentId: string,
  authorId: string,
  data: { content?: string; status?: CommentStatus }
) => {
  const commentData = await prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId,
    },
  });
  if (!commentData) {
    throw new Error("Invalid input");
  }

  if (commentData.status === data.status) {
    throw new Error("Already up to date");
  }

  return await prisma.comment.update({
    where: {
      id: commentData.id,
    },
    data,
  });
};

export const CommentService = {
  createComment,
  getCommentById,
  getCommentByAuthorId,
  commentDeleteById,
  updateComment,
};
