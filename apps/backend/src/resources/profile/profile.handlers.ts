import { RequestHandler } from "express";
import { z } from "zod";
import { FBAdmin } from "../../configs/firebase";
import { ValidateProfile } from "./profile.validation";

export const getProfile: RequestHandler = async (req, res) => {
  const doc = await FBAdmin.firestore()
    .collection("users")
    .doc(req.user!.uid)
    .get();

  if (!doc.exists) {
    return res.status(404).send({
      status: "fail",
      code: "resource/profile-not-found",
      message: "user profile not found",
    });
  }

  res.status(200).json({ status: "success", data: doc.data() });
};

export const updateOrUpdateProfile: RequestHandler<
  {},
  {},
  z.infer<typeof ValidateProfile>
> = async (req, res) => {
  const profile = await FBAdmin.firestore()
    .collection("users")
    .doc(req.user!.uid);

  const exists = (await profile.get()).exists;

  await profile.set(req.body, { merge: false });

  const doc = await profile.get();

  res.status(exists ? 200 : 201).json({ status: "success", data: doc.data() });
};
