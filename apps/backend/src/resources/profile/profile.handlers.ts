import { RequestHandler } from "express";
import path from "path";
import { z } from "zod";
import { FBAdmin, storageBaseUrl } from "../../configs/firebase";
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

export const uploadCV: RequestHandler = async (req, res) => {
  const cv = req.file!;

  const destination = path.join(req.user?.uid!, cv.originalname);

  await FBAdmin.storage()
    .bucket()
    .upload(cv.path, {
      destination,
      metadata: { contentType: cv.mimetype },
      contentType: cv.mimetype,
    });

  const cvUrl = `${storageBaseUrl}/${encodeURIComponent(
    destination
  )}?alt=media`;

  await FBAdmin.firestore().collection("users").doc(req.user!.uid).set(
    {
      cv: cvUrl,
    },
    { merge: true }
  );

  res.status(200).json({
    status: "success",
    message: "successfully uploaded",
    data: cvUrl,
  });
};
