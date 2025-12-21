import express from "express";
import {
  addBManager,
  deleteBManager,
  editBM,
  login,
  loginBM,
  signOut,
  signOutBM,
} from "../controller/auth.controller.js";
import { isLogin } from "../middleware/isLogin.js";
import { isAdmin } from "../middleware/isAdmin.js";
const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/bmlogin", loginBM);
authRouter.post("/signout", isLogin, signOut);
authRouter.post("/bmsignout", isLogin, signOutBM);
authRouter.post("/addbranchmanager", isLogin, isAdmin, addBManager);
authRouter.delete("/deletebranchmanager/:id", isLogin, isAdmin, deleteBManager);
authRouter.patch("/editbranchmanager/:id", isLogin, isAdmin, editBM);

export default authRouter;
