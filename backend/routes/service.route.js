import express from "express";
import {
  addService,
  deleteService,
  editService,
  getAllService,
} from "../controller/service.controller.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { upload } from "../utils/multerHandler.js";

const serviceRouter = express.Router();

serviceRouter.post("/addservice", upload.single("image"), addService);
serviceRouter.delete("/deleteservice/:id", isAdmin, deleteService);
serviceRouter.patch("/editservice/:id", isAdmin, editService);
serviceRouter.get("/getallservice", getAllService);
export default serviceRouter;
