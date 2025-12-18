import db from "../config/dbconnect.js";
import { removeImg } from "../utils/removeimg.js";

export const addInquiry = async (req, res, next) => {
  const { name, phone, address, email, description, branch_id } = req.body;
  try {
    if (!name || !phone || !address || !branch_id) {
      return res.status(403).json({
        message: "please provide  these required fields:(name,phone,address)",
      });
    }

    await db.execute(
      "INSERT INTO inquiry(name,phone,address,email,description,branch_id) VALUES(?,?,?,?,?,?)",
      [name, phone, address, email, description, branch_id]
    );
    return res.status(200).json({
      mesage: "inquiry succesfully registered",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllInquiry = async (req, res, next) => {
  try {
    const [inquiryResult] = await db.execute(`SELECT
       i.inquiry_id,
       i.name,
       i.phone,
       i.address,
       i.email,
       i.description,
       i.branch_id,
       b.branch_name
       FROM inquiry i
       LEFT JOIN branch b
       ON i.branch_id = b.branch_id`);

    return res.status(200).json({
      message: "succesfully retrieved relevant inquiries",
      data: inquiryResult,
    });
  } catch (error) {
    next(error);
  }
};

export const addReview = async (req, res, next) => {
  const { name, star, description, branch_id } = req.body;
  try {
    if (!name || !description || !branch_id) {
      return res.status(403).json({
        message: " please fill all the required fields",
      });
    }

    await db.execute(
      "INSERT INTO review(name,star,description,branch_id) VALUES(?,?,?,?)",
      [name, star, description, branch_id]
    );
    return res.status(200).json({
      message: "Review Added Succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllReview = async (req, res, next) => {
  try {
    const [reviewResult] = await db.execute(`select
        r.review_id,
        r.name,
        r.star,
        r.description,
        r.branch_id,
        b.branch_name
        From review r
        LEFT JOIN branch b
        ON r.branch_id = b.branch_id`);

    return res.status(200).json({
      message: "Reviews Successfully Retrieved",
      data: reviewResult,
    });
  } catch (error) {
    next(error);
  }
};

export const addGallery = async (req, res, next) => {
  const { title, date, location, branch_id } = req.body;
  console.log(req.files);
  console.log(req.body);

  try {
    if (!title || !date || !location || !branch_id) {
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => removeImg(file.path));
      }

      return res.status(403).json({
        message: "please provide all the required information ",
      });
    }

    const [existingB] = await db.execute(
      "SELECT branch_id FROM branch where branch_id = ?",
      [branch_id]
    );
    if (existingB.length === 0) {
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => removeImg(file.path));
      }
      return res.status(403).json({
        message: "branch not found",
      });
    }
    const insertPromises = req.files.map((file) => {
      const paths = req.files
        ? req.files.map((file) => `uploads/gallery/${file.filename}`).join(",")
        : null;

      return db.execute(
        "INSERT INTO gallery(title,date,location,gallery_img,branch_id) VALUES(?,?,?,?,?)",
        [title, date, location, paths, branch_id]
      );
    });
    await Promise.all(insertPromises);
    return res.status(200).json({
      message: "photo and it`s details successfully added to gallery",
    });
  } catch (error) {
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => removeImg(file.path));
    }
    next(error);
  }
};

export const getAllGallery = async (req, res, next) => {
  try {
    const [resultG] = await db.execute("SELECT * FROM gallery");
    return res.status(200).json({
      message: "successfully retrieved all gallery",
      data: resultG,
    });
  } catch (error) {
    next(error);
  }
};
