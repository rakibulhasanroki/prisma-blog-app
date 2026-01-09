import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        emailVerified: boolean;
      };
    }
  }
}

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const session = await betterAuth.api.getSession({
      headers: req.headers as any,
    });
    if (!session) {
      res.status(401).json({
        status: false,
        message: "You are unauthorized",
      });
    }

    if (!session?.user.emailVerified) {
      res.status(403).json({
        status: false,
        message: "Email verification needed",
      });
    }

    req.user = {
      id: session?.user.id as string,
      name: session?.user.name as string,
      email: session?.user.email as string,
      role: session?.user.role as string,
      emailVerified: session?.user.emailVerified as boolean,
    };
    if (roles.length && !roles.includes(req.user.role as UserRole)) {
      res.status(403).json({
        status: false,
        message: "Forbidden",
      });
    }

    next();
  };
};

export default auth;
