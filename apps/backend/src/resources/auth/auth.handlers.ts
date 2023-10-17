import { RequestHandler } from "express";
import { z } from "zod";
import { FBAdmin, FBAuth } from "../../configs/firebase";
import { ValidateLogin, ValidateRegister } from "./auth.validation";

export const login: RequestHandler<
  {},
  {},
  z.infer<typeof ValidateLogin>
> = async (req, res) => {
  const credintial = await FBAuth.signInWithEmailAndPassword(
    FBAuth.getAuth(),
    req.body.email,
    req.body.password
  );

  res.status(200).json({
    data: await credintial.user.getIdToken(),
  });
};

export const getSession: RequestHandler = async (req, res) => {
  console.log(req.headers.authorization);
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).send({
      status: "fail",
      code: "auth/missing-jwt-token",
      message: "unauthorized",
    });
  }

  await FBAdmin.auth().verifyIdToken(token);

  const expiresIn = 1000 * 60 * 60 * 24;

  const sessionCookies = FBAdmin.auth().createSessionCookie(token, {
    expiresIn,
  });

  res.cookie("session", sessionCookies, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
  });

  res.json({ status: "success" });
};

export const register: RequestHandler<
  {},
  {},
  z.infer<typeof ValidateRegister>
> = async (req, res) => {
  const credintial = await FBAuth.createUserWithEmailAndPassword(
    FBAuth.getAuth(),
    req.body.email,
    req.body.password
  );

  res.status(201).json({
    data: await credintial.user.getIdToken(),
  });
};
