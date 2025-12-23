import bcrypt from "bcryptjs";
import db from "../config/dbconnect.js";
import { removeImg } from "../utils/removeimg.js";

export const addStaff = async (req, res, next) => {
  const {
    name,
    email,
    position,
    phone,
    description,
    branch_id,
    service_id,
    password,
  } = req.body;

  try {
    if (req.user.branch_id !== branch_id) {
      if (req.file) {
        removeImg(req.file.path);
      }
      return res.status(403).json({
        message: "permission not available to add staff in foreign branch",
      });
    }

    if (!name || !email || !position || !phone || !branch_id || !password) {
      if (req.file) {
        removeImg(req.file.path);
      }
      return res.status(400).json({
        message: "please provide all details",
      });
    }

    const [existsB] = await db.execute("SELECT branch_id FROM branch ");
    if (existsB.length === 0) {
      if (req.file) {
        removeImg(req.file.path);
      }
      return res.status(404).json({
        message: "branch not found",
      });
    }

    const [existS] = await db.execute("SELECT email,phone FROM staff");
    if (existS.length > 0) {
      const emailExists = existS.some((s) => s.email === email);
      const phoneExists = existS.some((s) => s.phone === phone);

      if (emailExists) {
        if (req.file) {
          removeImg(req.file.path);
        }
        return res.status(400).json({ message: "Email already exists" });
      }
      if (phoneExists) {
        if (req.file) {
          removeImg(req.file.path);
        }
        return res.status(400).json({ message: "Phone number already exists" });
      }
    }

    const Path = req.file ? `uploads/staff/${req.file.filename}` : null;
    const hashedPasswordS = await bcrypt.hash(password, 10);

    await db.execute(
      "INSERT INTO staff(name,position,email,phone,description,branch_id,service_id,staff_img,password) VALUES(?,?,?,?,?,?,?,?,?)",
      [
        name,
        position,
        email,
        phone,
        description,
        branch_id,
        service_id,
        Path,
        hashedPasswordS,
      ]
    );
    return res.status(200).json({
      message: "staff added successfully",
    });
  } catch (error) {
    if (req.file) {
      removeImg(req.file.path);
    }

    next(error);
  }
};

export const getAllStaff = async (req, res, next) => {
  const { role, branch_id } = req.user;
  try {
    let query = `SELECT
     st.staff_id,
     st.name,
     st.email,
     st.phone,
     st.position,
     st.description,
     st.service_id,
     s.name as service_name, 
     st.branch_id,
     b.branch_name
     FROM staff st
     LEFT JOIN services s ON st.service_id = s.service_id
     LEFT JOIN branch b ON st.branch_id = b.branch_id `;
    //s.name as service_name, to avoid name conflict as s.name overrides st.name as both column have same title

    const queryParams = [];

    if (role === "branch_manager") {
      query += `where st.branch_id =?`;
      queryParams.push(branch_id);
    }

    const [resultS] = await db.execute(query, queryParams);
    return res.status(200).json({
      message: " all staff data retrieved",
      data: resultS,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStaff = async (req, res, next) => {
  const { staff_id } = req.params;
  try {
    const [inputStId] = await db.execute(
      "select staff_id from staff where staff_id =? ",
      [staff_id]
    );
    if (inputStId.length === 0) {
      return res.status(400).json({
        message: "staff not found",
      });
    }

    db.execute("DELETE FROM staff where staff_id=?", [staff_id]);
    return res.status(200).json({
      message: "staff deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateStaff = async (req, res, next) => {
  const { staff_id } = req.params;
  const { email, password } = req.body;
  try {
    const [detailSt] = await db.execute(
      "SELECT * FROM staff where staff_id=?",
      [staff_id]
    );
    if (detailSt.length === 0) {
      return res.status(400).json({
        message: "staff not found",
      });
    }

    await db.execute(
      "UPDATE staff SET email= ?, password =? WHERE staff_id = ?",
      [email, password, staff_id]
    );
    return res.status(200).json({
      message: "staff updated succesfully",
    });
  } catch (error) {
    next(error);
  }
};
