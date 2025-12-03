import dotenv from "dotenv";
import db from "../config/dbconnect.js";


dotenv.config();

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });

        }

        const [result] = await db.execute("SELECT * FROM users WHERE email=?", [email]);
        const user = result[0];

        if (result.length === 0) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }


    } catch (error) {
        console.log("error");

    }

}