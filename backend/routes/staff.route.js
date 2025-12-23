import express from "express";
import {
  addStaff,
  deleteStaff,
  getAllStaff,
  updateStaff,
} from "../controller/staff.controller.js";
import { staffUpload } from "../utils/multerHandler.js";
import { isLogin } from "../middleware/isLogin.js";
import { authorizeRoles } from "../middleware/isAuthorized.js";

const staffRouter = express.Router();

staffRouter.post(
  "/addstaff",
  isLogin,
  authorizeRoles("branch_manager"),
  staffUpload.single("image"),
  addStaff
);
staffRouter.get(
  "/getallstaff",
  isLogin,
  authorizeRoles("branch_manager", "admin"),
  getAllStaff
);
staffRouter.delete(
  "/deletestaff/:staff_id",
  isLogin,
  authorizeRoles("branch_manager"),
  deleteStaff
);
staffRouter.patch(
  "/updatestaff/:staff_id",
  isLogin,
  authorizeRoles("branch_manager"),
  updateStaff
);

export default staffRouter;
