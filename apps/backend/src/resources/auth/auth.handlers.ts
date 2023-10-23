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
