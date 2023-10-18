import { Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const errorMiddleware: Middleware = (_store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    let message;
    if (action.payload.error) {
      if (action.payload.error.includes("NetworkError")) {
        message =
          "unable to connect to server, please check your internet connection";
      }
    } else if (action.payload.data) {
      message = action.payload.data.message;
    }
    toast.error(message, { position: "bottom-center" });
  }

  return next(action);
};

export default errorMiddleware;
