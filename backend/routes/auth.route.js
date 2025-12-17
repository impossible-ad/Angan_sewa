import express from "express";
import { login, signOut } from "../controller/auth.controller.js";
import { isLogin } from "../middleware/isLogin.js";
const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/signout", isLogin, signOut);

export default authRouter;
