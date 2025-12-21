import db from "../config/dbconnect.js";
import { removeImg } from "../utils/removeimg.js";

export const addService = async (req, res, next) => {
  try {
    const { name, description, address, branch_id } = req.body;
    console.log(req.file);
    if (!name || !description || !address || !branch_id) {
      if (req.file) {
        removeImg(req.file.path);
      }
      return res.status(400).json({
        message: "please provide all required data",
      });
    }
    const [inputtedBid] = await db.execute(
      "SELECT branch_id from branch where branch_id=?",
      [branch_id]
    );
    if (inputtedBid === 0) {
      if (req.file) {
        removeImg(req.file.path);
      }
      return res.status(403).json({
        message: "branch not found",
      });
    }
    const imgPath = req.file ? `uploads/service/${req.file.filename}` : null;
    await db.execute(
      "INSERT INTO services(name,description,address, img, branch_id) VALUES(?,?,?,?,?)",
      [name, description, address, imgPath, branch_id]
    );
    return res.status(200).json({
      message: "New Service Added",
    });
  } catch (error) {
    if (req.file) {
      removeImg(req.file.path);
    }
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const { service_id } = req.params;

    const [inputedId] = await db.execute(
      "SELECT service_id FROM services where service_id=?",
      [service_id]
    );

    if (inputedId.length == 0) {
      return res.status(400).json({
        message: "no such service found",
      });
    }
    if (inputedId[0].img) {
      removeImg(`uploads/services/${inputedId[0].img.split("/").pop()}`);
    }

    await db.execute("DELETE FROM services where service_id=?", [service_id]);
    return res.status(200).json({
      message: "Service succesfully Deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const editService = async (req, res, next) => {
  try {
    const { service_id } = req.params;
    const { name, description, address, img } = req.body;

    const [existing] = await db.execute(
      "SELECT * FROM services WHERE service_id = ?",
      [service_id]
    );

    if (existing.length === 0) {
      return res.status(400).json({
        message: "no such service found",
      });
    }

    await db.execute(
      "INSERT INTO services(name,description,address,img) VALUES(?,?,?,?)",
      [name, description, address, img]
    );

    return res.status(200).json({
      message: "New Service Added",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllService = async (req, res, next) => {
  try {
    const [result] = await db.execute(`SELECT 
     s.service_id,
     s.name,
     s.description,
     s.address,
     s.img,
     s.branch_id,
     b.branch_name
     FROM services s
     LEFT JOIN branch b
     ON s.branch_id = b.branch_id `);

    return res.status(200).json({
      message: "all services are retrieved",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
