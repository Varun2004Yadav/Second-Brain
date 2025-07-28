import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_USER_PASSWORD } from "../routers/user";

interface AuthRequest extends Request {
  userId?: string;
}

export function userMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers['token'] as string | undefined;

    if (!token) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    const decoded = jwt.verify(token, JWT_USER_PASSWORD) as jwt.JwtPayload;

    if (decoded && decoded.id) {
      req.userId = decoded.id;
      next();
    } else {
      res.status(403).json({
        message: "Invalid token"
      });
    }

  } catch (err) {
    console.error(err);
    res.status(403).json({
      message: "You are not signed in"
    });
  }
}
