import express from "express";
import {
  addBManager,
  deleteBManager,
  editBM,
  getAllPDB,
  getBManager,
  login,
  signOut,
} from "../controller/auth.controller.js";
import { isLogin } from "../middleware/isLogin.js";
import { authorizeRoles } from "../middleware/isAuthorized.js";
const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/signout", signOut);
authRouter.post(
  "/addbranchmanager",
  isLogin,
  authorizeRoles("admin"),
  addBManager
);
authRouter.delete(
  "/deletebranchmanager/:id",
  isLogin,
  authorizeRoles("admin"),
  deleteBManager
);
authRouter.patch(
  "/editbranchmanager/:id",
  isLogin,
  authorizeRoles("admin"),
  editBM
);
authRouter.get(
  "/getbranchmanager",
  isLogin,
  authorizeRoles("admin"),
  getBManager
);
authRouter.get("/getallpdb", isLogin, authorizeRoles("admin"), getAllPDB);

export default authRouter;
