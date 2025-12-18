import express from "express";
import {
  addService,
  deleteService,
  editService,
  getAllService,
} from "../controller/service.controller.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { serviceUpload } from "../utils/multerHandler.js";
import { isLogin } from "../middleware/isLogin.js";

const serviceRouter = express.Router();

serviceRouter.post(
  "/addservice",
  isLogin,
  isAdmin,
  serviceUpload.single("image"),
  addService
);
serviceRouter.delete("/deleteservice/:id", isLogin, isAdmin, deleteService);
serviceRouter.patch("/editservice/:id", isLogin, isAdmin, editService);
serviceRouter.get("/getallservice", isLogin, isAdmin, getAllService);
export default serviceRouter;
