import { Router } from "express";
import authRouter from "./controllers/auth.controller";
import prospectRouter from "./controllers/prospect.controller";
import conversationRouter from "./controllers/conversation.controller";
import webhookRouter from "./controllers/webhook.controller";

import AuthHandler from "./middlewares/authHandler.middleware";

const router = Router();
router.use("/auth", authRouter);
router.use("/prospects", AuthHandler.authorization, prospectRouter);
router.use("/conversations", AuthHandler.authorization, conversationRouter);
router.use("/webhook", webhookRouter);
export default router;
