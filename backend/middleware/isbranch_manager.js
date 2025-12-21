export const isBManager = (req, res, next) => {
  const { role } = req.user;
  if (role !== "branch_manager") {
    return res.status(403).json({
      message: "Access Denied. Feature reserved for branch manager",
    });
  }
  next();
};
