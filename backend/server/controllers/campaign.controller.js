import { Router } from "express";
import * as HttpStatus from "http-status-codes";
import { check, validationResult } from "express-validator";
import Campaign from "../models/campaign";

const campaignRouter = Router();

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

export default campaignRouter;
