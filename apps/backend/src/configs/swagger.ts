import {
  OpenAPIRegistry,
  OpenApiGeneratorV31,
} from "@asteasolutions/zod-to-openapi";
import express from "express";
import swaggerUi from "swagger-ui-express";

export namespace Swagger {
  export const registery = new OpenAPIRegistry();

  export const bearerAuth = registery.registerComponent(
    "securitySchemes",
    "bearerAuth",
    {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    }
  );

  export const getRouter = () => {
    const router = express.Router();

    router.use(swaggerUi.serve);
    router.get("/", swaggerUi.setup(generateDocs()));

    return router;
  };

  function generateDocs() {
    return new OpenApiGeneratorV31(registery.definitions).generateDocument({
      info: {
        title: "Job Seeker with Weather Integration API",
        version: "1.0.0",
      },
      servers: [{ url: "/api" }],
      openapi: "3.0.1",
    });
  }
}
