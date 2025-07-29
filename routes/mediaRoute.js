const express = require("express");
const multer = require("multer");
const { storage } = require("../config/cloudinaryConfig");
const {
  createMediaFile,
  getMediaFiles,
  deleteMediaFile,
} = require("../controllers/mediaController");

const router = express.Router();
const upload = multer({ storage });


// 👇 Apply upload middleware before controller
router.post("/", upload.single("image"), createMediaFile);
router.get("/", getMediaFiles);
router.delete("/:id", deleteMediaFile);

module.exports = router;

