export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const { role } = req.user;
    // if (!req.user) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    if (!roles.includes(role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
