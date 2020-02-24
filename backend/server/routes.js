import { Router } from "express";
import loginRouter from "./controllers/login.controller";
import logoutRouter from "./controllers/logout.controller";
import prospectRouter from "./controllers/prospect.controller";
import messagingRouter from "./controllers/messaging.controller";
import conversationRouter from "./controllers/conversation.controller";
import AuthHandler from "./middlewares/authHandler.middleware";

const router = Router();
router.use("/auth", [loginRouter, logoutRouter]);
router.use("/prospects", AuthHandler.authorization, prospectRouter);
router.use("/conversations", AuthHandler.authorization, conversationRouter);
router.use("/webhook/", messagingRouter);
export default router;
