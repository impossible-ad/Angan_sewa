import express from "express";
import {
  addBranch,
  addDistrict,
  addProvince,
  deleteDistrict,
  deleteProvince,
  getAllBranch,
  getAllDistrict,
  getAllProvince,
} from "../controller/branch.controller.js";

const branchRouter = express.Router();

branchRouter.post("/addprovince", addProvince);
branchRouter.get("/getallprovince", getAllProvince);
branchRouter.delete("/deleteprovince/:province_id", deleteProvince);
branchRouter.post("/adddistrict", addDistrict);
branchRouter.get("/getalldistrict", getAllDistrict);
branchRouter.delete("/deletedistrict/:district_id", deleteDistrict);
branchRouter.post("/addbranch", addBranch);
branchRouter.get("/getallbranch", getAllBranch);

export default branchRouter;
