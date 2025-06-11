const express = require("express");
const multer = require("multer");
const { storage } = require("../config/cloudinaryConfig");
const upload = multer({ storage });


const {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlogById); // Assuming you have a function to get a single blog by ID
router.post("/",
    upload.fields([
        { name: "image", maxCount: 1 },
    ]),
    createBlog); // Multer handles image uploads
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
