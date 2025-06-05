const Media = require("../models/mediaModel"); // Import the Media model
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
const upload = multer({ storage: storage, fileFilter }).single("image");

// Create a new media file
const createMediaFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const newMediaFile = new Media({ image: imageUrl });
    const savedMediaFile = await newMediaFile.save();

    res.status(201).json({
      message: "Media file created successfully",
      mediaFile: savedMediaFile,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Get all media files
const getMediaFiles = async (req, res) => {
  try {
    const mediaFiles = await Media.find();
    res.status(200).json(mediaFiles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a media file
const updateMediaFile = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedMediaFile = await Media.findByIdAndUpdate(id, { new: true });

    if (!updatedMediaFile) {
      return res.status(404).json({ message: "Media file not found" });
    }

    res.status(200).json({
      message: "Media file updated successfully",
      mediaFile: updatedMediaFile,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a media file
const deleteMediaFile = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMediaFile = await Media.findByIdAndDelete(id);

    if (!deletedMediaFile) {
      return res.status(404).json({ message: "Media file not found" });
    }

    res.status(200).json({
      message: "Media file deleted successfully",
      mediaFile: deletedMediaFile,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createMediaFile,
  getMediaFiles,
  updateMediaFile,
  deleteMediaFile,
};
