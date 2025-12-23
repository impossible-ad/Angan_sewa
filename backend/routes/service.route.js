import express from "express";
import {
  addService,
  deleteService,
  editService,
  getAllService,
} from "../controller/service.controller.js";
import { serviceUpload } from "../utils/multerHandler.js";
import { isLogin } from "../middleware/isLogin.js";
import { authorizeRoles } from "../middleware/isAuthorized.js";

const serviceRouter = express.Router();

serviceRouter.post(
  "/addservice",
  isLogin,
  authorizeRoles("branch_manager"),
  serviceUpload.single("image"),
  addService
);
serviceRouter.delete(
  "/deleteservice/:service_id",
  isLogin,
  authorizeRoles("branch_manager"),
  deleteService
);
serviceRouter.patch(
  "/editservice/:service_id",
  isLogin,
  authorizeRoles("branch_manager"),
  editService
);
serviceRouter.get("/getallservice", isLogin, authorizeRoles("branch_manager"), getAllService);
export default serviceRouter;
