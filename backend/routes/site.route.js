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
import { branchMatch } from "../middleware/branchMatch.js";

const siteRouter = express.Router();

siteRouter.post("/addinquiry", isLogin, addInquiry);
siteRouter.get(
  "/getallinquiry",
  isLogin,
  authorizeRoles("branch_manager", "admin"),
  branchMatch,
  getAllInquiry
);
siteRouter.post("/addreview", isLogin, addReview);
siteRouter.get(
  "/getallreview",
  isLogin,
  authorizeRoles("branch_manager", "admin"),
  branchMatch,
  getAllReview
);
siteRouter.post(
  "/addgallery",
  isLogin,
  authorizeRoles("branch_manager"),
  galleryUpload.array("image", 20),
  branchMatch,
  addGallery
);
siteRouter.get(
  "/getallgallery",
  isLogin,
  authorizeRoles("branch_manager", "admin"),
  branchMatch,
  getAllGallery
);

export default siteRouter;
