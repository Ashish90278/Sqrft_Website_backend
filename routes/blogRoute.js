const express = require("express");
const multer = require("multer");
const { storage } = require("../config/cloudinaryConfig");

const {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();
const upload = multer({ storage });

router.get("/", getBlogs);
router.get("/:id", getBlogById); // Assuming you have a function to get a single blog by ID
router.post("/", upload.single("image"), createBlog);
// Multer handles image uploads
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
