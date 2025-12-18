import express from "express";
import {
  addGallery,
  addInquiry,
  addReview,
  getAllGallery,
  getAllInquiry,
  getAllReview,
} from "../controller/site.controller.js";
import { isLogin } from "../middleware/isLogin.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { galleryUpload } from "../utils/multerHandler.js";

const siteRouter = express.Router();

siteRouter.post("/addinquiry", addInquiry);
siteRouter.get("/getallinquiry", isLogin, getAllInquiry);
siteRouter.post("/addreview", addReview);
siteRouter.get("/getallreview", isLogin, getAllReview);
siteRouter.post(
  "/addgallery",
  isLogin,
  galleryUpload.array("image", 20),
  addGallery
);
siteRouter.get("/getallgallery", isLogin, getAllGallery);

export default siteRouter;
