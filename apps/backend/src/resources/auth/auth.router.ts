import { Router } from "express";
import { Swagger } from "../../configs/swagger";
import { validateMiddleware } from "../../middlewares/validation.middleware";
import { getSession, login, register } from "./auth.handlers";
import { ValidateLogin, ValidateRegister } from "./auth.validation";

export const authRouter = Router();

Swagger.registery.registerPath({
  tags: ["Auth"],
  path: "/auth/register",
  method: "post",
  request: {
    body: {
      content: {
        "application/json": {
          schema: ValidateRegister,
        },
      },
    },
  },
  responses: {
    201: {
      description: "success",
    },
  },
});
authRouter.post(
  "/register",
  validateMiddleware({ body: ValidateRegister }),
  register
);

Swagger.registery.registerPath({
  tags: ["Auth"],
  path: "/auth/login",
  method: "post",
  request: {
    body: {
      content: {
        "application/json": {
          schema: ValidateLogin,
        },
      },
    },
  },
  responses: {
    200: {
      description: "success",
    },
  },
});
authRouter.post("/login", validateMiddleware({ body: ValidateLogin }), login);

Swagger.registery.registerPath({
  tags: ["Auth"],
  path: "/auth/get-session",
  method: "post",
  security: [{ [Swagger.bearerAuth.name]: [] }],
  responses: {
    200: {
      description: "success",
    },
  },
});
authRouter.post("/get-session", getSession);
