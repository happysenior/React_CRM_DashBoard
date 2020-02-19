import bcrypt from "bcryptjs";
import { Router } from "express";
import * as HttpStatus from "http-status-codes";
import { check, validationResult } from "express-validator";
import User from "../models/user";

const loginRouter = Router();

loginRouter
  .route("/login")
  .post(
    [
      check("email").isEmail(),
      check("password").isLength({ min: 1, max: 255 })
    ],
    async (req, res, next) => {
      try {
        const user = await User.find({ email: "happinessalex231@gmail.com" });
        res
          .status(HttpStatus.OK)
          .json({
            success: true,
            user
          })
          .end();
      } catch (error) {
        console.log(error);
        const err = {
          success: false,
          code: HttpStatus.BAD_REQUEST,
          error
        };
        next(err);
      }
    }
  );

export default loginRouter;
