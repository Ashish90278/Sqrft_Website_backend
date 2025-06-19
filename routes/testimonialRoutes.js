const express = require("express");
const multer = require("multer");
const { storage } = require("../config/cloudinaryConfig");
const upload = multer({ storage });

const {
  getTestimonialUsers,
  createTestimonialUser,
  updateTestimonialUser,
  deleteTestimonialUser,
} = require("../controllers/testimonialController");

const router = express.Router();

router.get("/", getTestimonialUsers);
router.post("/", upload.single("image"), createTestimonialUser);
// Multer handles image uploads
router.put("/:id", updateTestimonialUser);
router.delete("/:id", deleteTestimonialUser);

module.exports = router;
