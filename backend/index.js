import express from "express";
import dotenv from 'dotenv';
import db from "./config/dbconnect.js";
import authRouter from "./routes/auth.route.js";
import serviceRouter from "./routes/service.route.js";


dotenv.config();

const app = express();
const port = process.env.port;

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/service", serviceRouter);
app.use("/uploads", express.static("uploads"));

try {
    await db.connect();
    console.log("MY SQL CONNECTED SUCCESSFULLY");


} catch (error) {
    console.log("MY SQL CONNECTION FAILED");
}

app.listen(port, () => {
    console.log(`server is running in ${port}`)
}
)