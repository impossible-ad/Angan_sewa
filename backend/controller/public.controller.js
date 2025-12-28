import db from "../config/dbconnect.js";

export const getAllService = async (req, res, next) => {
  const { province_id, district_id, branch_id } = req.query;

  try {
    let query = `SELECT 
   s.service_id,
   s.name,
   s.description,
   s.address,
   s.img,
   s.branch_id,
   b.branch_name,
   d.district_id,
   d.district_name,
   d.province_id,
   p.province_name

   FROM services s
   LEFT JOIN branch b
   ON s.branch_id = b.branch_id
   LEFT JOIN district d ON b.district_id = d.district_id
   LEFT JOIN province p ON d.province_id = p.province_id
   WHERE 1=1`;

    const queryParams = [];

    if (branch_id) {
      query += ` AND s.branch_id = ?`;
      queryParams.push(branch_id);
    }
    if (district_id) {
      query += ` AND d.district_id = ?`;
      queryParams.push(district_id);
    }
    if (province_id) {
      query += ` AND p.province_id = ?`;
      queryParams.push(province_id);
    }

    const [result] = await db.execute(query, queryParams);

    return res.status(200).json({
      message: "all services are retrieved",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllGallery = async (req, res, next) => {
  const { province_id, district_id, branch_id } = req.query;
  try {
    let query = `SELECT
      g.gallery_id,
      g.title,
      g.date,
      g.location,
      g.gallery_img,
      g.branch_id,
      b.branch_name,
       b.district_id,
     d.district_name,
     d.province_id,
     p.province_name
       FROM gallery g
      LEFT JOIN branch b ON g.branch_id = b.branch_id
      LEFT JOIN district d ON b.district_id = d.district_id
     LEFT JOIN province p ON d.province_id = p.province_id
     WHERE 1=1`;

    const queryParams = [];

    if (branch_id) {
      query += ` AND g.branch_id = ?`;
      queryParams.push(branch_id);
    }
    if (district_id) {
      query += ` AND b.district_id = ?`;
      queryParams.push(district_id);
    }
    if (province_id) {
      query += ` AND p.province_id = ?`;
      queryParams.push(province_id);
    }

    const [resultG] = await db.execute(query, queryParams);
    return res.status(200).json({
      message: "successfully retrieved all gallery",
      data: resultG,
    });
  } catch (error) {
    next(error);
  }
};
