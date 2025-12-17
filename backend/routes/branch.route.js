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
import { isAdmin } from "../middleware/isAdmin.js";

const branchRouter = express.Router();

branchRouter.post("/addprovince", isLogin, isAdmin, addProvince);
branchRouter.get("/getallprovince", isLogin,isAdmin, getAllProvince);
branchRouter.delete("/deleteprovince/:province_id", isLogin,isAdmin, deleteProvince);
branchRouter.post("/adddistrict", isLogin,isAdmin, addDistrict);
branchRouter.get("/getalldistrict", isLogin,isAdmin, getAllDistrict);
branchRouter.delete("/deletedistrict/:district_id", isLogin,isAdmin, deleteDistrict);
branchRouter.post("/addbranch", isLogin,isAdmin, addBranch);
branchRouter.get("/getallbranch", isLogin,isAdmin, getAllBranch);
branchRouter.delete("/deletebranch/:branch_id", isLogin,isAdmin, deleteBranch);

export default branchRouter;
