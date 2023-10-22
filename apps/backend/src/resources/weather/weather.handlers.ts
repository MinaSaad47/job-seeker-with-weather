import axios from "axios";
import { RequestHandler } from "express";
import { z } from "zod";
import { FBAdmin } from "../../configs/firebase";
import { ValidateProfile } from "../profile/profile.validation";

export const getCurretWeather: RequestHandler = async (req, res) => {
  const doc = await FBAdmin.firestore()
    .collection("users")
    .doc(req.user!.uid)
    .get();

  if (!doc.exists) {
    return res.status(404).send({
      status: "fail",
      code: "resource/profile-not-found",
      message: "profile not found",
    });
  }

  const profile = doc.data() as z.infer<typeof ValidateProfile>;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${profile.location.lat}&lon=${profile.location.lng}&appid=${process.env.OPEN_WEATHER_APPID}&units=metric`;

  const response = await axios.get(url);

  if (response.status !== 200) {
    return res.status(404).send({
      status: "fail",
      code: "resource/weather-not-found",
      message: response.data.message,
    });
  }

  res.status(200).json({ status: "success", data: response.data });
};

export const getForecats: RequestHandler = async (req, res) => {
  const doc = await FBAdmin.firestore()
    .collection("users")
    .doc(req.user!.uid)
    .get();

  if (!doc.exists) {
    return res.status(404).send({
      status: "fail",
      code: "resource/profile-not-found",
      message: "profile not found",
    });
  }

  const profile = doc.data() as z.infer<typeof ValidateProfile>;

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${profile.location.lat}&lon=${profile.location.lng}&appid=${process.env.OPEN_WEATHER_APPID}&units=metric`;

  const response = await axios.get(url, { validateStatus: (_) => true });

  if (response.status !== 200) {
    return res.status(404).send({
      status: "fail",
      code: "resource/forcast-not-found",
      message: response.data.message,
    });
  }

  res.status(200).json({ status: "success", data: response.data });
};
