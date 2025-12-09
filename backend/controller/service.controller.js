import db from "../config/dbconnect.js";

export const addService = async (req, res) => {
  try {
    const { name, description, address } = req.body;
    console.log(req.body);

    if (!name || !description || !address) {
      return res.status(400).json({
        message: "please provide all required data",
      });
    }

    await db.execute(
      "INSERT INTO services(name,description,address) VALUES(?,?,?)",
      [name, description, address]
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

    const [inputedId] = await db.execute("SELECT id FROM services where id=?", [
      id,
    ]);

    if (inputedId.length == 0) {
      return res.status(400).json({
        message: "no such service found",
      });
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
    const { name, description, address } = req.body;

    const [existing] = await db.execute("SELECT * FROM services WHERE id = ?", [
      id,
    ]);

    if (existing.length === 0) {
      return res.status(400).json({
        message: "no such service found",
      });
    }

    await db.execute(
      "INSERT INTO services(name,description,address) VALUES(?,?,?)",
      [name, description, address]
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
