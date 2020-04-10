import { Router } from "express";
import * as HttpStatus from "http-status-codes";
import { check, validationResult, sanitizeQuery } from "express-validator";
import mongoose, { Schema } from "mongoose";
import Sequence from "../models/sequence";
import Campaign from "../models/campaign";

const sequenceRouter = Router();

sequenceRouter.route("/:campaignId").post(async (req, res, next) => {
  try {
    const sequence = new Sequence();
    await sequence.save();
    console.log(sequence);
    await Campaign.findByIdAndUpdate(req.params.campaignId, {
      sequence: sequence._id,
    });
    res.send({ sequence });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

sequenceRouter.route("/").post(async (req, res, next) => {
  try {
    const sequence = new Sequence(req.body);
    const doc = await sequence.save();
    res.send({ sequence: doc });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

sequenceRouter.route("/:id").get(async (req, res, next) => {
  try {
    const sequence = await Sequence.findById(req.params.id);
    res.send({ sequence });
  } catch (err) {
    console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

sequenceRouter.route("/:id").put(async (req, res, next) => {
  try {
    console.log(req.body);
    await Sequence.findByIdAndUpdate(req.params.id, req.body);
    // const sequence = await Sequence.findById(req.params.id);
    res.send({ status: true });
  } catch (err) {
    console.log(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

export default sequenceRouter;
