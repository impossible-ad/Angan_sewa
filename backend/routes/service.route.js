import express from "express";
import { addService, deleteService } from "../controller/service.controller.js";

const serviceRouter = express.Router();

serviceRouter.post("/addservice", addService);
serviceRouter.delete("/deleteservice/:id", deleteService);

export default serviceRouter;
