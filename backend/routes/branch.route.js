import express from "express";
import {
  addBranch,
  addDistrict,
  addProvince,
  deleteBranch,
  deleteDistrict,
  deleteProvince,
  getAllBranch,
  getAllDistrict,
  getAllProvince,
} from "../controller/branch.controller.js";
import { isLogin } from "../middleware/isLogin.js";
import { authorizeRoles } from "../middleware/isAuthorized.js";

const branchRouter = express.Router();

branchRouter.post(
  "/addprovince",
  isLogin,
  authorizeRoles("admin"),
  addProvince
);
branchRouter.get(
  "/getallprovince",
  isLogin,
  authorizeRoles("admin"),
  getAllProvince
);
branchRouter.delete(
  "/deleteprovince/:province_id",
  isLogin,
  authorizeRoles("admin"),
  deleteProvince
);
branchRouter.post(
  "/adddistrict",
  isLogin,
  authorizeRoles("admin"),
  addDistrict
);
branchRouter.get(
  "/getalldistrict",
  isLogin,
  authorizeRoles("admin"),
  getAllDistrict
);
branchRouter.delete(
  "/deletedistrict/:district_id",
  isLogin,
  authorizeRoles("admin"),
  deleteDistrict
);
branchRouter.post("/addbranch", isLogin, authorizeRoles("admin"), addBranch);
branchRouter.get(
  "/getallbranch",
  isLogin,
  authorizeRoles("admin"),
  getAllBranch
);
branchRouter.delete(
  "/deletebranch/:branch_id",
  isLogin,
  authorizeRoles("admin"),
  deleteBranch
);

export default branchRouter;
