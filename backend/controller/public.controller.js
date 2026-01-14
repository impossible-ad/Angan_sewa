import db from "../config/dbconnect.js";
import { paginatedData, paginationTool } from "../utils/paginationHandler.js";

export const getAllService = async (req, res, next) => {
  const { branch_id } = req.params;

  try {
    let query = `SELECT 
   s.service_id,
   s.name,
   s.description,
   s.address,
   s.img
   FROM services s
   LEFT JOIN branch b
   ON s.branch_id = b.branch_id
    WHERE s.branch_id = ?`;

    const [result] = await db.execute(query, [branch_id]);

    return res.status(200).json({
      message: "all services are retrieved",
      data: result,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const getAllGallery = async (req, res, next) => {
  const { province_id, district_id, branch_id } = req.query;
  try {
    const { page, limit, offset } = paginationTool(req.query);
    // console.log("province_id:", province_id, "Type:", typeof province_id);
    // console.log("district_id:", district_id, "Type:", typeof district_id);
    // console.log("branch_id:", branch_id, "Type:", typeof branch_id);
    // console.log("page:", page, "Type:", typeof page);
    // console.log("limit:", limit, "Type:", typeof limit);
    // console.log("offset:", offset, "Type:", typeof offset);

    let whereClause = ` WHERE 1=1`;
    const queryParams = [];

    if (branch_id) {
      whereClause += ` AND g.branch_id = ?`;
      queryParams.push(parseInt(branch_id));
    }
    if (district_id) {
      whereClause += ` AND b.district_id = ?`;
      queryParams.push(parseInt(district_id));
    }
    if (province_id) {
      whereClause += ` AND d.province_id = ?`;
      queryParams.push(parseInt(province_id));
    }

    const countQuery = `
      SELECT COUNT(*) as total 
      FROM gallery g
      LEFT JOIN branch b ON g.branch_id = b.branch_id
      LEFT JOIN district d ON b.district_id = d.district_id
      LEFT JOIN province p ON d.province_id = p.province_id
      ${whereClause}`;
    const [countResult] = await db.execute(countQuery, queryParams);
    const total = countResult[0]?.total || 0;

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
      ${whereClause}
      ORDER BY g.date DESC
      LIMIT ${limit} OFFSET ${offset}`;

    // Don't add limit and offset to queryParams anymore
    const [resultG] = await db.execute(query, queryParams);
    const response = paginatedData(resultG, page, limit, total);
    return res.status(200).json({
      message: "successfully retrieved all gallery",
      ...response,
    });
  } catch (error) {
    console.error("Error details:", error);
    next(error);
  }
};
