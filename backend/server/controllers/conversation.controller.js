import { Router } from "express";
import * as HttpStatus from "http-status-codes";
import Conversation from "../models/conversation";
import Prospect from "../models/prospect";

import { RestClient } from "@signalwire/node";
import Mongoose, { Schema } from "mongoose";

const client = new RestClient(
  "3c150da3-23da-4589-b800-b3167ae01849",
  "PT0216da18454bf91caed2d084e54021ad1f1e9629e3081b26",
  { signalwireSpaceUrl: "realestate-test.signalwire.com" }
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
      res.send({
        success: true,
        conversation
      });
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  });

export default conversationRouter;
