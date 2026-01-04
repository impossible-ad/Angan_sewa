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

    const [result] = await db.execute(
      `SELECT 
      u.id,
      u.name,
      u.email,
      u.password,
      u.role,
      u.branch_id,
      b.branch_name
      FROM users u
      LEFT JOIN branch b
      ON u.branch_id = b.branch_id
      where u.email=?`,
      [email]
    );
    const user = result[0];

    if (result.length === 0) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = await jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        branch_id: user.branch_id,
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

    return res.status(200).json({
      message: "login Successful",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        branch: user.branch_name,
        branch_id: user.branch_id,
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

export const addBManager = async (req, res, next) => {
  const { name, email, password, branch_id } = req.body;
  try {
    if (!name || !email || !password || !branch_id) {
      return res.status(403).json({
        message: "pleasse provide all details",
      });
    }
    const [existingB] = await db.execute(
      "SELECT branch_id FROM branch where branch_id=?",
      [branch_id]
    );
    if (existingB.length === 0) {
      return res.status(404).json({
        message: "branch not found",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    await db.execute(
      "INSERT INTO users(name,email,password,branch_id) VALUES(?,?,?,?)",
      [name, email, hashedPassword, branch_id]
    );
    return res.status(200).json({
      message: "branch manager successfully added",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBManager = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [existsBm] = await db.execute("SELECT id from users WHERE id=?", [
      id,
    ]);
    if (existsBm.length === 0) {
      return res.status(403).json({
        message: "branch manager not found",
      });
    }

    await db.execute("DELETE FROM users where id=?", [id]);
    return res.status(200).json({
      message: "branch manager successfully deleted ",
    });
  } catch (error) {
    next(error);
  }
};

export const editBM = async (req, res, next) => {
  const { id } = req.params;
  const { name, role, email, password } = req.body;
  try {
    const [existsE] = await db.execute(
      "SELECT email from users where email=?",
      [email]
    );
    if (existsE.length > 0) {
      return res.status(402).json({
        message: "email already in use",
      });
    }

    const [existsBM] = await db.execute("SELECT * from users WHERE id=?", [id]);

    if (existsBM.length === 0) {
      return res.status(403).json({
        message: "branch manager not found",
      });
    }

    const branchM = existsBM[0];
    const updatedName = name || branchM.name;
    const updatedrole = role || branchM.role;

    const hashedCPassword = await bcryptjs.hash(password, 10);

    await db.execute(
      "INSERT INTO users(name,role,email,password) VALUES(?,?,?,?)",
      [updatedName, updatedrole, email, hashedCPassword]
    );
    return res.status(200).json({
      message: "branch manager credentials successfully updated",
    });
  } catch (error) {
    next(error);
  }
};

export const getBManager = async (req, res, next) => {
  try {
    const [result] = await db.execute(
      `SELECT u.id, u.name, u.email, u.role, b.branch_name
       FROM users u 
       INNER JOIN branch b ON u.branch_id = b.branch_id`
    );
    return res.status(200).json({
      message: "successfully fetched",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
