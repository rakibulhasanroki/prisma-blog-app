import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

export default function errorHandeler(
  err: any,
  re: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = err;

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "Missing field or Incorrect field type provided";
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 500;
      errorMessage =
        "An operation failed because it depends on one or more records that were required but not found. ";
    }
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage = "Response from the Engine was empty";
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      errorMessage = "Authentication failed.Please check your credential";
    }
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    statusCode = 500;
    errorMessage = "The connection is not build properly";
  }

  res.status(statusCode).json({
    message: errorMessage,
    error: errorDetails,
  });
}
