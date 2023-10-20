import { Router } from "express";
import { Swagger } from "../../configs/swagger";
import { requireJWTMiddleware } from "../../middlewares/auth.middleware";
import { uploadMiddleware } from "../../middlewares/upload.middleware";
import {
  getProfile,
  updateOrUpdateProfile,
  uploadCV,
} from "./profile.handlers";
import { ValidateProfile as ValidateProfileCreate } from "./profile.validation";

export const profileRouter = Router();

profileRouter.use(requireJWTMiddleware);

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

Swagger.registery.registerPath({
  tags: ["Profile"],
  path: "/profile/upload-cv",
  security: [{ [Swagger.bearerAuth.name]: [] }],
  method: "post",
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            required: ["cv"],
            properties: {
              cv: {
                type: "string",
                format: "binary",
              },
            },
          },
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
profileRouter.post("/upload-cv", uploadMiddleware.single("cv"), uploadCV);
