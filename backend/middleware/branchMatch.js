import { removeImg } from "../utils/removeimg.js";

export const branchMatch = async (req, res, next) => {
  if (req.user.role === "admin") {
    return next();
  }

  const targetBranchId = req.body.branch_id || req.params.branch_id;
  if (!targetBranchId) {
    return res.status(400).json({
      message: "Branch ID is required for this operation",
    });
  }

  if (req.user.branch_id.toString() !== targetBranchId.toString()) {
    if (req.file?.path || req.files) {
      removeImg(req.file?.path || req.files);
    }
    return res.status(403).json({
      message: "authorization not available in foreign branch",
    });
  }
  next();
};
