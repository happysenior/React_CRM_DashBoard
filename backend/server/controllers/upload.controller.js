import { Router } from "express";
import * as HttpStatus from "http-status-codes";
import fs from "fs";
import path from "path";
import multer from "multer";
import config from "../config/config";

const uploadRouter = Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const fName = Date.now() + "_" + file.originalname;
    cb(null, fName);
  },
});

const fileUpload = multer({
  storage,
  limits: { fileSize: 20000000 },
  fileFilter: function (req, file, cb) {
    console.log(file);
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  // const filetypes = /csv/;
  // const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // const mimetype = filetypes.test(file.mimetype);
  const extname = true;
  if (extname) {
    return cb(null, true);
  } else {
    cb("Error: file only");
  }
}

uploadRouter
  .route("/")
  .post(fileUpload.single("uploadFile"), async (req, res, next) => {
    try {
      res.send({ url: `${config.host}/files/${req.file.filename}` });
    } catch (error) {
      console.log(error);
    }
  });

export default uploadRouter;
