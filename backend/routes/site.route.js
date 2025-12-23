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
import { galleryUpload } from "../utils/multerHandler.js";
import { authorizeRoles } from "../middleware/isAuthorized.js";

const siteRouter = express.Router();

siteRouter.post("/addinquiry", isLogin, addInquiry);
siteRouter.get(
  "/getallinquiry",
  isLogin,
  authorizeRoles("branch_manager", "admin"),
  getAllInquiry
);
siteRouter.post("/addreview", isLogin, addReview);
siteRouter.get(
  "/getallreview",
  isLogin,
  authorizeRoles("branch_manager", "admin"),
  getAllReview
);
siteRouter.post(
  "/addgallery",
  isLogin,
  authorizeRoles("branch_manager"),
  galleryUpload.array("image", 20),
  addGallery
);
siteRouter.get(
  "/getallgallery",
  isLogin,
  authorizeRoles("branch_manager", "admin"),
  getAllGallery
);

export default siteRouter;
