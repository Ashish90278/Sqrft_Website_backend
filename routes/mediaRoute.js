const express = require("express");
const router = express.Router();
const {
  createMediaFile,
  getMediaFiles,
  deleteMediaFile,
} = require("../controllers/mediaController");

// Move multer here
const multer = require("multer");
const path = require("path");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error("Only JPEG, JPG, and PNG files are allowed!"));
};

const upload = multer({ storage, fileFilter });

// 👇 Apply upload middleware before controller
router.post("/", upload.single("image"), createMediaFile);
router.get("/", getMediaFiles);
router.delete("/:id", deleteMediaFile);

module.exports = router;

