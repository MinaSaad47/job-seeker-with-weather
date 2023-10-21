import { Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { removeToken } from "../slices/tokenSlide";

const errorMiddleware: Middleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    let message;
    if (action.payload.error) {
      if (action.payload.error.includes("NetworkError")) {
        message =
          "unable to connect to server, please check your internet connection";
      }
    } else if (action.payload.data) {
      message = action.payload.data.message;
      if (action.payload.status === 401) {
        store.dispatch(removeToken());
      } else if (
        action.payload.status === 404 &&
        action.payload.data.code === "resource/profile-not-found"
      ) {
        message = undefined;
      }
    }
    toast.error(message, { position: "bottom-center" });
  }

  return next(action);
};

export default errorMiddleware;
