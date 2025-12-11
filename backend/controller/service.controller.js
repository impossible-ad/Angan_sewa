import db from "../config/dbconnect.js";
import { removeImg } from "../utils/removeimg.js";

export const addService = async (req, res) => {
  try {
    const { name, description, address } = req.body;
    const img = req.file;
    console.log(req.file);

    if (!name || !description || !address) {
      if (req.file) {
        removeImg(req.file.imagePath);
      }
      return res.status(400).json({
        message: "please provide all required data",
      });
    }
    const imgPath = req.file ? `uploads/service/${req.file.filename}` : null;
    await db.execute(
      "INSERT INTO services(name,description,address, img) VALUES(?,?,?,?)",
      [name, description, address, imgPath]
    );
    return res.status(200).json({
      message: "New Service Added",
    });
  } catch (error) {
    console.log(" Service Failed to Add", error);
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const [inputedId] = await db.execute(
      "SELECT id,img FROM services where id=?",
      [id, img]
    );

    if (inputedId.length == 0) {
      return res.status(400).json({
        message: "no such service found",
      });
    }
    if (inputedId[0].img) {
      removeImg(`uploads/services/${inputedId[0].img.split("/").pop()}`);
    }

    await db.execute("DELETE FROM services where id=?", [id]);
    return res.status(200).json({
      message: "Service succesfully Deleted",
    });
  } catch (error) {
    console.log(" Service Failed to delete");
  }
};

export const editService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, address, img } = req.body;

    const [existing] = await db.execute("SELECT * FROM services WHERE id = ?", [
      id,
    ]);

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
    console.log(" Service Failed to Add", error);
  }
};

export const getAllService = async (req, res) => {
  try {
    const [result] = await db.execute("SELECT * FROM services ");

    return res.status(200).json({
      message: "all services are retrieved",
      data: result,
    });
  } catch (error) {
    console.log("failed to get all services listed");
  }
};
