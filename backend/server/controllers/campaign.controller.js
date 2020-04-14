import { Router } from "express";
import * as HttpStatus from "http-status-codes";
import { check, validationResult } from "express-validator";
import Campaign from "../models/campaign";
import Prospect from "../models/prospect";
import Conversation from "../models/conversation";

const campaignRouter = Router();

campaignRouter.route("/aggregation").get(async (req, res, next) => {
  try {
    let campaigns = await Campaign.find({});
    campaigns = await Promise.all(
      campaigns.map(async (x) => {
        let prospects = await Prospect.find({ campaign: x._id });
        let prospectIds = prospects.map((x) => x._id);
        let messages = await Conversation.find({
          prospect: {
            $in: prospectIds,
          },
          outgoing: false,
        });
        return {
          ...x._doc,
          prospects: prospectIds.length,
          messages: messages.length,
        };
      })
    );
    res.send({ campaigns });
  } catch (err) {
    console.log(err);
  }
});

campaignRouter.route("/statistic/:id").get(async (req, res, next) => {
  try {
    let campaign = await Campaign.findById(req.params.id);
    let allProspects = await Prospect.countDocuments({});
    let subProspects = await Prospect.find({ campaign: req.params.id });
    let prospectIds = subProspects.map((x) => x.id);
    let allConversations = await Conversation.countDocuments({
      outgoing: false,
    });
    let subConversations = await Conversation.find({
      prospect: { $in: prospectIds },
      outgoing: false,
    });
    let outgoingConversations = await Conversation.find({
      prospect: { $in: prospectIds },
      outgoing: true,
    });
    let responseRate =
      outgoingConversations.length > 0
        ? subConversations.length / outgoingConversations.length
        : 100;
    if (subConversations.length == 0) responseRate = 0;
    console.log(allConversations);
    res.send({
      allProspects,
      subProspects: subProspects.length,
      prospectPercent: Math.ceil(subConversations.length / allProspects),
      allConversations: allConversations,
      subConversations: subConversations.length,
      conversationPercent:
        allConversations > 0
          ? Math.ceil(subConversations.length / allConversations)
          : 0,
      outgoingConversations: outgoingConversations.length,
      respondedPercent:
        outgoingConversations.length + subConversations.length > 0
          ? Math.ceil(
              subConversations.length /
                (outgoingConversations.length + subConversations.length)
            )
          : 0,
      responseRate,
    });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

campaignRouter.route("/:id").get(async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate(
      "sequence"
    );
    res.send({ campaign });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

campaignRouter.route("/").post(async (req, res, next) => {
  try {
    const campaign = new Campaign({ name: req.body.name });
    const doc = await campaign.save();
    res.send({ campaign: doc });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

campaignRouter.route("/:id").put(async (req, res, next) => {
  try {
    await Campaign.findByIdAndUpdate(req.params.id, req.body);
    res.send({ status: true });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

campaignRouter.route("/:id").delete(async (req, res, next) => {
  try {
    await Campaign.findByIdAndDelete(req.params.id);
    res.send({ status: true });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

campaignRouter.route("/").get(async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({});
    res.send({ campaigns });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

export default campaignRouter;
