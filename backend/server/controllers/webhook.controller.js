import { Router, text } from "express";
import * as HttpStatus from "http-status-codes";
import Conversation from "../models/conversation";
import Prospect from "../models/prospect";

import { RestClient } from "@signalwire/node";
import Mongoose, { Schema } from "mongoose";

import config from "../config/config";
import conversationRouter from "./conversation.controller";

const client = new RestClient(
  config.signalwire.projectId,
  config.signalwire.token,
  { signalwireSpaceUrl: config.signalwire.space }
);

const webhookRouter = Router();

webhookRouter.route("/confirm").post(async (req, res, next) => {
  try {
    const phone = req.body.phone;
    const prospect = await Prospect.findOne({ phone });
    const conversation = new Conversation({
      message: "true",
      prospect: prospect._id,
      outgoing: false,
      method: "text"
    });
    await conversation.save();
    res.send({ conversation });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

webhookRouter.route("/message").post(async (req, res, next) => {
  try {
    const response = new RestClient.LaML.MessagingResponse();
    const phone = req.body.From;
    const message = req.body.Body;
    const prospect = await Prospect.findOne({ phone });
    if (prospect) {
      const conversation = new Conversation({
        message,
        prospect: prospect._id,
        outgoing: false,
        method: "text"
      });
      await conversation.save();
    }
    res.set("Content-Type", "text/xml");
    res.send(response.toString());
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

export default webhookRouter;
