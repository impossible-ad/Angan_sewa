import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export default db;
