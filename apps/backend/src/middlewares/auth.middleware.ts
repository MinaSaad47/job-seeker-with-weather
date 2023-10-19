import { RequestHandler } from "express";
import { FBAdmin } from "../configs/firebase";

export const requireJWT: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    return res.status(401).send({
      status: "fail",
      code: "auth/missing-jwt-token",
      message: "unauthorized",
    });
  }

  const decodedToken = await FBAdmin.auth().verifyIdToken(token);

  req.user = decodedToken;

  return next();
};
