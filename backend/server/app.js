import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";

import routes from "./routes";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../public/build")));
app.use("/api", routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.redirect("/");
  // var err = new Error("Not Found");
  // err.status = 404;
  // next(err);
});

export default app;
