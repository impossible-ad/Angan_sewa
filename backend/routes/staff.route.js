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
import { branchMatch } from "../middleware/branchMatch.js";

const staffRouter = express.Router();

staffRouter.post(
  "/addstaff",
  isLogin,
  authorizeRoles("branch_manager"),
  staffUpload.single("image"),
  branchMatch,
  addStaff
);
staffRouter.get(
  "/getallstaff",
  isLogin,
  authorizeRoles("branch_manager", "admin"),
  branchMatch,
  getAllStaff
);
staffRouter.delete(
  "/deletestaff/:staff_id",
  isLogin,
  authorizeRoles("branch_manager"),
  branchMatch,
  deleteStaff
);
staffRouter.patch(
  "/updatestaff/:staff_id",
  isLogin,
  authorizeRoles("branch_manager"),
  branchMatch,
  updateStaff
);

export default staffRouter;
