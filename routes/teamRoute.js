const express = require("express");
const multer = require("multer");
const { storage } = require("../config/cloudinaryConfig");
const upload = multer({ storage });

const {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/teamController");

const router = express.Router();

router.use((req, res, next) => {
  console.log("📥 Request received at /api/teamMembers");
  next();
});

router.get("/", getTeamMembers);
router.post(
  "/",
  (req, res, next) => {
    upload.single("image")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log("Multer error:", err);
        return res
          .status(400)
          .json({ message: "Multer error", error: err.message });
      } else if (err) {
        console.log("Unknown upload error:", err);
        return res
          .status(400)
          .json({ message: "Unknown upload error", error: err.message });
      }

      console.log("✅ File received, moving to controller");
      next(); // Move to actual handler
    });
  },
  createTeamMember
); // Multer handles image uploads
router.put("/:id", updateTeamMember);
router.delete("/:id", deleteTeamMember);

module.exports = router;
