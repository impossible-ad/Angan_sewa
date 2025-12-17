import express from "express";
import {
  addInquiry,
  addReview,
  getAllInquiry,
  getAllReview,
} from "../controller/site.controller.js";
import { isLogin } from "../middleware/isLogin.js";
import { isAdmin } from "../middleware/isAdmin.js";

const siteRouter = express.Router();

siteRouter.post("/addinquiry", addInquiry);
siteRouter.get("/getallinquiry", isLogin, isAdmin, getAllInquiry);
siteRouter.post("/addreview", addReview);
siteRouter.get("/getallreview", isLogin, isAdmin, getAllReview);

export default siteRouter;
