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
    const unreadMap = new Map();

    for (let conversation of conversations) {
      if(!conversation.prospect) continue;
      if (conversation.status === "new") {
        const cnt = unreadMap.get(conversation.prospect._id);
        if (cnt === undefined) unreadMap.set(conversation.prospect._id, 1);
        else unreadMap.set(conversation.prospect._id, cnt + 1);
      }
      if (contact.includes(conversation.prospect._id)) {
        continue;
      }
      contact.push(conversation.prospect._id);
      lastConversations.push(conversation);
    }
    let result = [];
    for (let i = 0; i < lastConversations.length; i++) {
      let unreadMessage = unreadMap.get(lastConversations[i].prospect._id);
      result.push({
        _id: lastConversations[i]._id,
        message: lastConversations[i].message,
        outgoing: lastConversations[i].outgoing,
        method: lastConversations[i].method,
        status: lastConversations[i].status,
        createdAt: lastConversations[i].createdAt,
        prospect: {
          _id: lastConversations[i].prospect._id,
          firstName: lastConversations[i].prospect.firstName,
          lastName: lastConversations[i].prospect.lastName
        },
        unreadMessage: unreadMessage ? unreadMessage : 0
      });
    }
    res.send({ success: true, list: result });
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

      const signalwireMessage = await client.messages.create({
        from: config.signalwire.messagingNumber,
        body: req.body.message,
        to: prospect.phone
      });
      res.send({
        success: true,
        conversation
      });
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  });

conversationRouter.route("/mark/:prospectId").get(async (req, res, next) => {
  try {
    await Conversation.updateMany(
      {
        prospect: Mongoose.Types.ObjectId(req.params.prospectId),
        outgoing: false
      },
      { $set: { status: "read" } }
    );
    res.send({
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

conversationRouter.route("/broadcast").post(async (req, res, next) => {
  try {
    const selectedProspectIds = req.body.selectedProspectIds;
    const message = req.body.message;
    const method = req.body.method;

    await Promise.all(
      selectedProspectIds.map(async id => {
        const conversation = new Conversation({
          message,
          prospect: Mongoose.Types.ObjectId(id),
          method
        });
        await conversation.save();
        const prospect = await Prospect.findById(id);

        const signalwireMessage = await client.messages.create({
          from: config.signalwire.messagingNumber,
          body: req.body.message,
          to: prospect.phone
        });
        console.log(signalwireMessage);
      })
    );
    res.send({
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

export default conversationRouter;
