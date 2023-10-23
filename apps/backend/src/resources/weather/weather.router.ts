import { Router } from "express";
import { Swagger } from "../../configs/swagger";
import { requireJWTMiddleware } from "../../middlewares/auth.middleware";
import { getForecats } from "./weather.handlers";

export const weatherRouter = Router();

weatherRouter.use(requireJWTMiddleware);

Swagger.registery.registerPath({
  tags: ["Weather"],
  path: "/weather/forecast",
  security: [{ [Swagger.bearerAuth.name]: [] }],
  method: "get",
  responses: {
    200: {
      description: "success",
    },
  },
});
weatherRouter.get("/forecast", getForecats);
