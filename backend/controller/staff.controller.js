export const addStaff = async (req, res, next) => {
  const { name, email, position, phone, description, id, service_id } =
    req.body;
  try {
    if (!name || !email || !position || !phone || !branch_id) {
      return res.status(200).json({
        message: "please provide all details",
      });
    }
    const [existsB] = await db.execute("SELECT branch_id FROM branch ");

    const [existS] = await db.execute("SELECT email,phone FROM staff");
  } catch (error) {
    next(error);
  }
};
