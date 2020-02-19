import { Router } from "express";
import loginRouter from "./controllers/login.controller";
import logoutRouter from "./controllers/logout.controller";

const router = Router();
router.use("/auth", [loginRouter, logoutRouter]);

export default router;
