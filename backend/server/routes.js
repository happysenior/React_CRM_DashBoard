import { Router } from "express";
import loginRouter from "./controllers/login.controller";

const router = Router();
router.use("/auth", loginRouter);

export default router;