import dotenv from "dotenv";
import db from "../config/dbconnect.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

dotenv.config();

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const [result] = await db.execute("SELECT * FROM users WHERE email=?", [
      email,
    ]);
    const user = result[0];

    if (result.length === 0) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = await jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.EXPIRES,
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    return res.status(200).json({
      message: "login Successful",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "successfully signed out",
    });
  } catch (error) {
    next(error);
  }
};
