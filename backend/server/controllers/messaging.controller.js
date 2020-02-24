import { Router } from "express";
import * as HttpStatus from "http-status-codes";

import { RestClient } from "@signalwire/node";

const client = new RestClient(
  "3c150da3-23da-4589-b800-b3167ae01849",
  "PT0216da18454bf91caed2d084e54021ad1f1e9629e3081b26",
  { signalwireSpaceUrl: "realestate-test.signalwire.com" }
);

const messagingRouter = Router();

messagingRouter
  .route("/messaging")

  .post(async (req, res, next) => {
    try {
      const response = new RestClient.LaML.MessagingResponse();
      response.message("Hello from SignalWire!");
      console.log(req.body);
    } catch (error) {
      next(err);
    }
  });

export default messagingRouter;
