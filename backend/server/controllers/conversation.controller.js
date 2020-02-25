import { Router } from "express";
import * as HttpStatus from "http-status-codes";
import Conversation from "../models/conversation";
import Prospect from "../models/prospect";

import { RestClient } from "@signalwire/node";
import Mongoose, { Schema } from "mongoose";

import config from "../config/config";

const client = new RestClient(
  config.signalwire.projectId,
  config.signalwire.token,
  { signalwireSpaceUrl: config.signalwire.space }
);

const conversationRouter = Router();

conversationRouter.route("/list").get(async (req, res, next) => {
  try {
    const conversations = await Conversation.find()
      .populate("prospect")
      .sort({ createdAt: "desc" });
    let contact = [],
      lastConversations = [];
    for (let conversation of conversations) {
      if (contact.includes(conversation.prospect._id)) continue;
      contact.push(conversation.prospect._id);
      lastConversations.push(conversation);
    }
    res.send({ success: true, list: lastConversations });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

conversationRouter.route("/chat/:prospectId").get(async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      prospect: Mongoose.Types.ObjectId(req.params.prospectId)
    }).sort({ createdAt: "asc" });
    res.send({ success: true, chat: conversations });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

conversationRouter
  .route("/prospect/:prospectId")
  .get(async (req, res, next) => {
    try {
      const prospect = await Prospect.findById(req.params.prospectId);
      res.send({
        success: true,
        prospect: {
          profile: prospect
        }
      });
    } catch (error) {}
  });

conversationRouter
  .route("/message/:prospectId")
  .post(async (req, res, next) => {
    try {
      const conversation = new Conversation({
        message: req.body.message,
        prospect: Mongoose.Types.ObjectId(req.params.prospectId)
      });
      await conversation.save();
      const prospect = await Prospect.findById(req.params.prospectId);

      client.messages
        .create({
          from: config.signalwire.messagingNumber,
          body: req.body.message,
          to: prospect.phone
        })
        .then(message => {
          console.log(message);
          res.send({
            success: true,
            conversation
          });
        })
        .done();
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  });

export default conversationRouter;
