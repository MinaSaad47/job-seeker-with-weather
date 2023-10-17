import dotenv from "dotenv";
dotenv.config();

import path from "path";

import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);

import express from "express";
import "express-async-errors";

import { Swagger } from "./configs/swagger";
import { errorHandler } from "./middlewares/errors.middlewar";
import { authRouter } from "./resources/auth/auth.router";

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/docs", Swagger.getRouter()); // callable function to confirm registering of swagger docs

const staticDir = path.join(__dirname, "../../frontend/dist");
app.use("/", express.static(staticDir));
app.get("/*", (_req, res) => {
  res.sendFile(path.join(staticDir, "index.html"));
});

app.use(errorHandler);

async function main() {
  app.listen(process.env.PORT, () =>
    console.log(`backend listening on port ${process.env.PORT}`)
  );
}

main();
