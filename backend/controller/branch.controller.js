import db from "../config/dbconnect.js";

export const addProvince = async (req, res) => {
  try {
    const { province_name } = req.body;
    console.log(req.body);

    if (!province_name) {
      return res.status(403).json({
        message: "please add the name of province",
      });
    }

    const [existingProvince] = await db.execute(
      "SELECT province_name from province where province_name=?",
      [province_name]
    );
    console.log(existingProvince);
    if (existingProvince.length > 0) {
      return res.status(403).json({
        message: "Province already exists",
      });
    }

    await db.execute("INSERT INTO province(province_name) VALUES(?)", [
      province_name,
    ]);
    return res.status(200).json({
      message: "New Province Sucessfully Created",
    });
  } catch (error) {
    console.log("failed to add province", error);
  }
};

export const getAllProvince = async (req, res) => {
  try {
    const [result] = await db.execute(
      "SELECT province_name,province_id FROM province"
    );
    return res.status(200).json({
      message: "succesfully retrieved all province name",
      data: result,
    });
  } catch (error) {
    console.log("failed to get all data", error);
  }
};

export const deleteProvince = async (req, res) => {
  const { province_id } = req.params;
  console.log(req.params);

  try {
    const [inputtedId] = await db.execute(
      "SELECT province_id FROM province where province_id=?",
      [province_id]
    );
    console.log(inputtedId);
    if (inputtedId.length == 0) {
      return res.status(403).json({
        message: "province doesnot exists",
      });
    }
    await db.execute("Delete from province where province_id=?", [province_id]);
    return res.status(200).json({
      message: "province successfully deleted",
    });
  } catch (error) {
    console.log("Failed to delete province", error);
  }
};
