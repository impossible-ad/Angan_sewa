import db from "../config/dbconnect.js";

export const addProvince = async (req, res, next) => {
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
    next(error);
  }
};

export const getAllProvince = async (req, res, next) => {
  try {
    const [result] = await db.execute(
      `SELECT 
      p.province_id,
       p.province_name,
       GROUP_CONCAT(d.district_name)
         FROM province p 
      LEFT JOIN district d 
      ON p.province_id = d.province_id
      GROUP BY p.province_id, p.province_name`
    );
    // const [result] = await db.execute(
    //   `SELECT
    //   p.province_id,
    //    p.province_name,
    //    GROUP_CONCAT(CONCAT(d.district_name, ':' , d.district_id)SEPARATOR ',') as district
    //      FROM province p
    //   LEFT JOIN district d
    //   ON p.province_id = d.province_id
    //   GROUP BY p.province_id, p.province_name`
    // );
    return res.status(200).json({
      message: "succesfully retrieved all province name",
      data: result,
    });
  } catch (error) {
    next(error);
    // console.log("failed to get all data", error);
  }
};

export const deleteProvince = async (req, res, next) => {
  const { province_id } = req.params;

  try {
    const [inputtedId] = await db.execute(
      "SELECT province_id FROM province where province_id=?",
      [province_id]
    );

    if (inputtedId.length == 0) {
      return res.status(403).json({
        message: "province doesnot exists",
      });
    }
    const [rows] = await db.execute(
      "SELECT COUNT(*) as district_count FROM district where province_id=?",
      [province_id]
    );
    const districtCount = rows[0].district_count;
    console.log(districtCount);
    if (districtCount > 0) {
      return res.status(403).json({
        message: "Cannot delete province which have valid district",
      });
    }

    await db.execute("Delete from province where province_id=?", [province_id]);
    return res.status(200).json({
      message: "province successfully deleted",
      data: districtCount,
    });
  } catch (error) {
    next(error);
  }
};

export const addDistrict = async (req, res) => {
  const { district_name, province_id } = req.body;

  try {
    if (!district_name || !province_id) {
      return res.status(403).json({
        message: "please provide district_name and province_id ",
      });
    }

    const [existingPe] = await db.execute(
      "SELECT province_id FROM province WHERE province_id=?",
      [province_id]
    );

    if (existingPe.length == 0) {
      return res.status(403).json({
        message: "province doesnot exists",
      });
    }

    const [existingDt] = await db.execute(
      "SELECT district_name FROM district WHERE district_name =?  ",
      [district_name]
    );

    if (existingDt > 0) {
      return res.status(403).json({
        message: "district already exists",
      });
    }

    await db.execute(
      "INSERT INTO district(district_name,province_id) VALUES(?,?)",
      [district_name, province_id]
    );
    return res.status(200).json({
      message: "district successfully added",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllDistrict = async (req, res, next) => {
  try {
    const [resultD] = await db.execute(`SELECT 
      d.district_id,
      d.district_name,
      p.province_name,
      GROUP_CONCAT(b.branch_name) as branches 
       FROM district d
       LEFT JOIN branch b ON d.district_id = b.district_id
       LEFT JOIN province p ON d.province_id = p.province_id
       GROUP BY d.district_id, d.district_name,province_name`);

    return res.status(200).json({
      message: "successfully retrieved all district's data",
      data: resultD,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDistrict = async (req, res, next) => {
  const { district_id } = req.params;
  try {
    const [inputtedDid] = await db.execute(
      "SELECT district_id FROM district where district_id=?",
      [district_id]
    );
    if (inputtedDid.length == 0) {
      return res.status(403).json({
        message: "district doesnot exists",
      });
    }
    const [rows] = await db.execute(
      "SELECT COUNT(*) as branch_count FROM branch where district_id=?",
      [district_id]
    );
    const branchCount = rows[0].branch_count;
    if (branchCount > 0) {
      return res.status(403).json({
        message: "Cannot delete district which have valid branch",
      });
    }

    await db.execute("DELETE FROM  district WHERE district_id=?", [
      district_id,
    ]);
    return res.status(200).json({
      message: "district successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const addBranch = async (req, res, next) => {
  const { branch_name, remarks, district_id } = req.body;
  try {
    if (!branch_name || !district_id) {
      return res.status(403).json({
        message: "please provide branch name and district id",
      });
    }

    const [existingDid] = await db.execute(
      "SELECT district_id from district where district_id = ?",
      [district_id]
    );
    if (existingDid.length == 0) {
      return res.status(403).json({
        message: "district doesnot exists",
      });
    }

    const [existingBn] = await db.execute(
      "SELECT branch_name FROM branch where branch_name=?",
      [branch_name]
    );
    if (existingBn > 0) {
      return res.status(403).json({
        message: "branch already exists",
      });
    }

    await db.execute(
      "INSERT INTO branch(branch_name,district_id,remarks) VALUES(?,?,?)",
      [branch_name, district_id, remarks]
    );
    return res.status(200).json({
      message: "branch added succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBranch = async (req, res, next) => {
  try {
    const [resultB] = await db.execute(
      `SELECT 
      b.branch_id,
      b.branch_name,
      b.remarks,
      d.district_name,
      GROUP_CONCAT(s.name) as services
      FROM branch b
      LEFT JOIN services s ON b.branch_id = s.branch_id
      LEFT JOIN district d ON b.district_id = d.district_id
      GROUP BY b.branch_id,b.branch_id,b.remarks,d.district_name `
    );
    return res.status(200).json({
      message: "Successfully retrieved all  branch data",
      data: resultB,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBranch = async (req, res, next) => {
  const { branch_id } = req.params;
  try {
    const [inputtedBid] = await db.execute(
      "SELECT branch_id FROM branch where branch_id=?",
      [branch_id]
    );
    if (inputtedBid == 0) {
      return res.status(403).json({
        message: "branch id not found",
      });
    }

    await db.execute("DELETE FROM branch WHERE branch_id =?", [branch_id]);
    return res.status(200).json({
      message: "branch successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};
