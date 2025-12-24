import fs from "fs";

export const removeImg = (path) => {
  try {
    if (Array.isArray(path)) {
      path.forEach((item) => {
        const targetPath = typeof item === "object" ? item.path : item;
        if (fs.existsSync(targetPath)) {
          fs.unlinkSync(targetPath);
        }
      });
    } else if (typeof path === "string" && fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (error) {
    console.log(`File Not Found ${path}`, error);
  }
};
