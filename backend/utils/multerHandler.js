import multer from "multer";

const serviceStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/services");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});
const galleryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/gallery");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

export const serviceUpload = multer({ storage: serviceStorage });
export const galleryUpload = multer({ storage: galleryStorage });
