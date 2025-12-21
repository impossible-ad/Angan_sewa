import express from "express";
import {
  addStaff,
  deleteStaff,
  getAllStaff,
  updateStaff,
} from "../controller/staff.controller.js";
import { staffUpload } from "../utils/multerHandler.js";

const staffRouter = express.Router();

staffRouter.post("/addstaff", staffUpload.single("image"), addStaff);
staffRouter.get("/getallstaff", getAllStaff);
staffRouter.delete("/deletestaff/:staff_id", deleteStaff);
staffRouter.patch("/updatestaff/:staff_id", updateStaff);

export default staffRouter;
