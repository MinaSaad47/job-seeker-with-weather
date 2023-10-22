import { RequestHandler } from "express";
import path from "path";
import { z } from "zod";
import { FBAdmin, storageBaseUrl } from "../../configs/firebase";
import { parseResume } from "../../utils/parseResume";
import { ValidateProfile } from "./profile.validation";

export const getProfile: RequestHandler = async (req, res) => {
  const profile = await FBAdmin.firestore()
    .collection("users")
    .doc(req.user!.uid)
    .get();

  if (!profile.exists) {
    return res.status(404).send({
      status: "fail",
      code: "resource/profile-not-found",
      message: "user profile not found",
    });
  }

  let data = profile.data();

  const assets = await FBAdmin.firestore()
    .collection("users_assets")
    .doc(req.user!.uid)
    .get();

  if (assets.exists) {
    data = { ...data, ...assets.data() };
  }

  res.status(200).json({ status: "success", data });
};

export const createOrUpdateProfile: RequestHandler<
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

  await FBAdmin.firestore().collection("users_assets").doc(req.user!.uid).set(
    {
      cv: cvUrl,
    },
    { merge: false }
  );

  let parsed;
  try {
    parsed = await parseResume(req.file?.path!, req.file?.mimetype!);
  } catch (_) {}

  res.status(200).json({
    status: "success",
    message: "successfully uploaded",
    data: {
      url: cvUrl,
      parsed,
    },
  });
};

export const uploadPicture: RequestHandler = async (req, res) => {
  const picture = req.file!;

  const destination = path.join(req.user?.uid!, picture.originalname);

  await FBAdmin.storage()
    .bucket()
    .upload(picture.path, {
      destination,
      metadata: { contentType: picture.mimetype },
      contentType: picture.mimetype,
    });

  const pictureUrl = `${storageBaseUrl}/${encodeURIComponent(
    destination
  )}?alt=media`;

  await FBAdmin.firestore().collection("users_assets").doc(req.user!.uid).set(
    {
      picture: pictureUrl,
    },
    { merge: false }
  );

  res.status(200).json({
    status: "success",
    message: "successfully uploaded",
    data: pictureUrl,
  });
};
