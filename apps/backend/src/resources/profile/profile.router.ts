import { Router } from "express";
import { Swagger } from "../../configs/swagger";
import { requireJWT } from "../../middlewares/auth.middleware";
import { getProfile, updateOrUpdateProfile } from "./profile.handlers";
import { ValidateProfile as ValidateProfileCreate } from "./profile.validation";

export const profileRouter = Router();

profileRouter.use(requireJWT);

Swagger.registery.registerPath({
  tags: ["Profile"],
  path: "/profile",
  security: [{ [Swagger.bearerAuth.name]: [] }],
  method: "get",
  responses: {
    200: {
      description: "success",
    },
  },
});
profileRouter.get("/", getProfile);

Swagger.registery.registerPath({
  tags: ["Profile"],
  path: "/profile",
  security: [{ [Swagger.bearerAuth.name]: [] }],
  method: "put",
  request: {
    body: {
      content: {
        "application/json": {
          schema: ValidateProfileCreate,
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
profileRouter.put("/", updateOrUpdateProfile);
