import express from "express";
import {
  addProvince,
  deleteProvince,
  getAllProvince,
} from "../controller/branch.controller.js";

const branchRouter = express.Router();

branchRouter.post("/addprovince", addProvince);
branchRouter.get("/getallprovince", getAllProvince);
branchRouter.delete("/deleteprovince/:province_id", deleteProvince);

export default branchRouter;
