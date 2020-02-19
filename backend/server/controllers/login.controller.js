import { Router } from "express";
import * as HttpStatus from "http-status-codes";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import AuthHandler from "../middlewares/authHandler.middleware";

const loginRouter = Router();

loginRouter.route("/login").post(
  [
    check("email").isEmail(),
    check("password")
      .exists({ checkNull: false })
      .isLength({ min: 1, max: 255 })
  ],
  async (req, res, next) => {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).end();
        return;
      }
      const user = await User.findOne({
        email: req.body.email
      });
      if (user) {
        if (user.authenticate(req.body.password) === true) {
          const token = AuthHandler.generateToken(user);
          res
            .status(HttpStatus.OK)
            .send({
              success: true,
              user: {
                firstName: user.firstName,
                lastName: user.lastName
              },
              token
            })
            .end();
        } else {
          res.status(HttpStatus.UNAUTHORIZED).end();
        }
      } else {
        res.status(HttpStatus.NOT_FOUND).end();
      }
    } catch (error) {
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
