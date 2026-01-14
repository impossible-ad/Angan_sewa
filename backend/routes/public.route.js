import express from "express";
import {
  getAllGallery,
  getAllService,
} from "../controller/public.controller.js";

const publicRouter = express.Router();

publicRouter.get("/getallservices/:branch_id", getAllService);
publicRouter.get("/getallgallery", getAllGallery);

export default publicRouter;
