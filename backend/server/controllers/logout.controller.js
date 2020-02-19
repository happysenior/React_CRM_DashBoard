import { Router } from "express";
import * as HttpStatus from "http-status-codes";

const logoutRouter = Router();

/**
 * Logout User
 *
 * @Method PUT
 * @URL /api/auth/logout
 *
 */
logoutRouter
  .route("/logout")

  .put(async (req, res, next) => {
    try {
      res.status(HttpStatus.OK).json({
        success: true
      });
    } catch (error) {
      next(err);
    }
  });

export default logoutRouter;
