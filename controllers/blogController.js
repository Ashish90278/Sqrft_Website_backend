const Blog = require("../models/blogModel");
const multer = require("multer");
const path = require("path");

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for only images
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

// Middleware to handle file upload
const upload = multer({ storage, fileFilter }).single("image");

// Create a blog post

const createBlog = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    try {
      const { title, description, para_1, para_2, conclusion, writtenBy } =
        req.body;
      if (
        !title ||
        !description ||
        !para_1 ||
        !para_2 ||
        !conclusion ||
        !writtenBy
      ) {
        return res
          .status(400)
          .json({
            message:
              "Title, description, para_1, para_2, conclusion and writtenBy are required",
          });
      }

      const image = req.file ? `/uploads/${req.file.filename}` : ""; // Store relative image path

      const newBlog = new Blog({
        title,
        description,
        para_1,
        para_2,
        conclusion,
        image: image,
        writtenBy,
      });
      const savedBlog = await newBlog.save();

      res.status(201).json({
        message: "Blog created successfully",
        blog: savedBlog,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
};

// Get all blog posts
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single blog post by ID

const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// Update a blog post
const updateBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBlog)
      return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// Delete a blog post
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog)
      return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({
      message: "Blog deleted successfully",
      blog: deletedBlog,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
