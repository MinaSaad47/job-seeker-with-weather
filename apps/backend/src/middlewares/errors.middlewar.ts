import { ErrorRequestHandler } from "express";
import _ from "lodash";
import { ZodError } from "zod";

import { FirebaseError as FirebaseAdminError } from "firebase-admin";
import { FirebaseError as FirebaseClientError } from "firebase/app";

export const errorsMiddleware: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  console.error(error);
  console.error("ERROR", { ...error });

  if (
    Object.keys(error).includes("codePrefix") ||
    error instanceof FirebaseClientError
  ) {
    handleFirebaseError(error, req, res, next);
  } else if (error instanceof ZodError) {
    handleZodError(error, req, res, next);
  }

  return res
    .status(500)
    .json({ status: "error", code: "internal", message: error.message });
};

const handleFirebaseError: ErrorRequestHandler = (
  error: FirebaseAdminError | FirebaseClientError,
  req,
  res,
  next
) => {
  if (
    _.includes(
      ["auth/email-already-exists", "auth/email-already-in-use"],
      error.code
    )
  ) {
    return res.status(400).send({
      status: "fail",
      code: "auth/email-already-exists",
      message: "email already exists",
    });
  } else if (error.code === "auth/invalid-login-credentials") {
    return res.status(401).send({
      status: "fail",
      code: error.code,
      message: "invalid login credentials",
    });
  } else if (error.code === "auth/argument-error") {
    return res.status(401).send({
      status: "fail",
      code: "auth/invalid-token",
      message: "invalid token",
    });
  } else if (error.code === "auth/id-token-expired")
  {
    return res.status(401).send({
      status: "fail",
      code: "auth/expired-token",
      message: "token has expired",
    });
  }
};

const handleZodError: ErrorRequestHandler = (
  error: ZodError,
  req,
  res,
  next
) => {
  const data = error.issues.map((issue) => {
    return {
      field: issue.path.reverse()[0],
      message: issue.message,
      code: issue.code,
    };
  });
  console.log(error);
  return res.status(400).send({
    status: "fail",
    code: "validation",
    message: "could not validate input successfully",
    data,
  });
};
