import { RequestHandler } from "express";
import { z } from "zod";

type Schema = {
  body?: z.Schema;
  params?: z.Schema;
  query?: z.Schema;
};

/*
 * Validate the request
 * @param schema - zod schema
 */
export const validateMiddleware = (schema: Schema) => {
  const middleware: RequestHandler = async (req, res, next) => {
    const { body, params, query } = req;
    z.object(schema).parse({ body, params, query });
    next();
  };

  return middleware;
};
