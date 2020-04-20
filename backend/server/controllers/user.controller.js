import { Router } from "express";
import * as HttpStatus from "http-status-codes";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import AuthHandler from "../middlewares/authHandler.middleware";
import config from "../config/config";
import { RestClient } from "@signalwire/node";

const client = new RestClient(
  config.signalwire.projectId,
  config.signalwire.token,
  { signalwireSpaceUrl: config.signalwire.space }
);

const userRouter = Router();

userRouter.route("/").get(AuthHandler.adminAuth, async (req, res, next) => {
  try {
    const users = await User.find({ role: "user" });
    res.send({ users });
  } catch (error) {
    const err = {
      success: false,
      code: HttpStatus.BAD_REQUEST,
      error,
    };
    next(err);
  }
});

userRouter.route("/").post(AuthHandler.adminAuth, async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send({ status: true });
  } catch (error) {
    console.log(error);
    const err = {
      success: false,
      code: HttpStatus.BAD_REQUEST,
      error,
    };
    next(err);
  }
});

userRouter.route("/:id").get(async (req, res, next) => {
  try {
    if (req.userRole == "user" && req.params.id != req.userId) {
      res.status(401).end();
      return;
    }
    const user = await User.findById(req.params.id);
    res.send({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        systemPhone: user.systemPhone,
      },
    });
  } catch (error) {
    res.status(500).end();
  }
});

userRouter.route("/:id").put(async (req, res, next) => {
  try {
    if (req.userRole != "admin" && req.params.id != req.userId) {
      res.status(401).end();
      return;
    }
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.send({ status: true });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

userRouter.route("/number/availability").post(async (req, res, next) => {
  try {
    const availablePhoneNumbers = await client
      .availablePhoneNumbers("US")
      .local.list({
        areaCode: req.body.areaCode,
      });
    res.send({ count: availablePhoneNumbers.length });
  } catch (error) {
    res.send({ count: 0 });
  }
});

userRouter.route("/number/get").post(async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const availablePhoneNumbers = await client
      .availablePhoneNumbers("US")
      .local.list({
        areaCode: req.body.areaCode,
      });
    const incoming_phone_number = await client.incomingPhoneNumbers.create({
      phoneNumber: availablePhoneNumbers[0].phoneNumber,
      SmsUrl: "https://desolate-refuge-15487.herokuapp.com/api/webhook/message",
    });
    await User.findByIdAndUpdate(req.userId, {
      systemPhone: incoming_phone_number.phoneNumber,
    });
    res.send({ incoming_phone_number });
  } catch (error) {
    res.send(500).end();
  }
});

export default userRouter;
