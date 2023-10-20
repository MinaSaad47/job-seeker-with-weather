import fs from "fs/promises";
import multer from "multer";

export const uploadMiddleware = multer({
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
    if (
      // filter only pdfs and docs files
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});
