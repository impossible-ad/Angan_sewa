import express from "express"
import { login, signOut } from "../controller/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/signout", signOut)

export default authRouter;