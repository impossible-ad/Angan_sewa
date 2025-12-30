import express from "express";
import dotenv from "dotenv";
import db from "./config/dbconnect.js";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import serviceRouter from "./routes/service.route.js";
import branchRouter from "./routes/branch.route.js";
import siteRouter from "./routes/site.route.js";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";
import cookieParser from "cookie-parser";
import staffRouter from "./routes/staff.route.js";
import publicRouter from "./routes/public.route.js";

dotenv.config();

const app = express();
const port = process.env.port;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/service", serviceRouter);
app.use("/api/branch", branchRouter);
app.use("/api/site", siteRouter);
app.use("/api/staff", staffRouter);
app.use("/api/public", publicRouter);
app.use("/uploads", express.static("uploads"));
app.use(globalErrorHandler);

try {
  await db.connect();
  console.log("MY SQL CONNECTED SUCCESSFULLY");
} catch (error) {
  console.log("MY SQL CONNECTION FAILED", error);
}

app.listen(port, () => {
  console.log(`server is running in ${port}`);
});
