import express from "express";
import {
  addInquiry,
  addReview,
  getAllInquiry,
  getAllReview,
} from "../controller/site.controller.js";

const siteRouter = express.Router();

siteRouter.post("/addinquiry", addInquiry);
siteRouter.get("/getallinquiry", getAllInquiry);
siteRouter.post("/addreview", addReview);
siteRouter.get("/getallreview", getAllReview);

export default siteRouter;
