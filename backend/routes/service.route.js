import express from "express";
import {
  addService,
  deleteService,
  editService,
  getAllService,
} from "../controller/service.controller.js";

const serviceRouter = express.Router();

serviceRouter.post("/addservice", addService);
serviceRouter.delete("/deleteservice/:id", deleteService);
serviceRouter.patch("/editservice/:id", editService);
serviceRouter.get("/getallservice", getAllService);
export default serviceRouter;
