import { Router } from "express";
import authRouter from "./controllers/auth.controller";
import prospectRouter from "./controllers/prospect.controller";
import conversationRouter from "./controllers/conversation.controller";
import campaignRouter from "./controllers/campaign.controller";
import sequenceRouter from "./controllers/sequence.controller";
import webhookRouter from "./controllers/webhook.controller";

import AuthHandler from "./middlewares/authHandler.middleware";

const router = Router();
router.use("/auth", authRouter);
router.use("/prospects", AuthHandler.authorization, prospectRouter);
router.use("/conversations", AuthHandler.authorization, conversationRouter);
router.use("/campaigns", AuthHandler.authorization, campaignRouter);
router.use("/sequences", AuthHandler.authorization, sequenceRouter);

router.use("/webhook", webhookRouter);
export default router;
