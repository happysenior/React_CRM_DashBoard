import { Router } from "express";
import * as HttpStatus from "http-status-codes";
import { check, validationResult } from "express-validator";
import fs from "fs";
import path from "path";
import multer from "multer";
import neatCsv from "neat-csv";
import Prospect from "../models/prospect";
import phone from "phone";

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    const fName = file.fieldname + "-" + Date.now() + ".csv";
    cb(null, fName);
  }
});

const csvUpload = multer({
  storage,
  limits: { fileSize: 2000000 },
  fileFilter: function(req, file, cb) {
    checkCSV(file, cb);
  }
});

function checkCSV(file, cb) {
  const filetypes = /csv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // const mimetype = filetypes.test(file.mimetype);
  if (extname) {
    return cb(null, true);
  } else {
    cb("Error: csv only");
  }
}

const prospectRouter = Router();

prospectRouter
  .route("/import")
  .post(
    [
      check("csvFile").exists({ checkNull: false }),
      check("match").exists({ checkNull: false })
    ],
    csvUpload.single("csvFile"),
    async (req, res, next) => {
      try {
        fs.readFile(`uploads/${req.file.filename}`, async (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          let csv = await neatCsv(data);
          const match = JSON.parse(req.body.match);
          await Promise.all(
            csv.map(async item => {
              let phoneNum = match.phone ? phone(item[match.phone])[0] : "";
              const feed = {
                firstName: match.firstName ? item[match.firstName] : "",
                lastName: match.lastName ? item[match.lastName] : "",
                phone: match.phone ? phoneNum : "",
                email: "testuser@gmail.com"
              };
              const prospect = new Prospect(feed);
              await prospect.save();
            })
          );

          res.status(200).json({ success: true, csv });
        });
      } catch (error) {
        console.log(error);
        res.status(500).end();
      }
    }
  );

prospectRouter
  .route("/read")
  .post(
    [
      check("filter").exists({ checkNull: false }),
      check("searchKey").exists({ checkNull: false })
    ],
    async (req, res, next) => {
      try {
        const prospects = await Prospect.find({});
        res.status(200).json({ success: true, prospects });
      } catch (error) {
        console.log(error);
        res.status(500).end();
      }
    }
  );

prospectRouter.route("/:id").get(async (req, res, next) => {
  try {
    const prospect = await Prospect.findById(req.params.id);
    res.send({
      success: true,
      prospect
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});
export default prospectRouter;
