import fs from "fs/promises";
import _ from "lodash";
import multer from "multer";
import { InvalidMimetypeError } from "../utils/errors";

/*
 * Multer middleware for uploading files with specified mimetypes
 * @param mimetype - array of mimetypes
 */
export const uploadMiddleware = (mimetype: string[]) =>
  multer({
    storage: multer.diskStorage({
      destination: async (req, file, cb) => {
        await fs.mkdir("/tmp/uploads", { recursive: true });
        return cb(null, "/tmp/uploads");
      },
      filename: (req, file, cb) => {
        return cb(null, file.originalname);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (_.includes(mimetype, file.mimetype)) {
        cb(null, true);
      } else {
        cb(new InvalidMimetypeError());
      }
    },
  });
