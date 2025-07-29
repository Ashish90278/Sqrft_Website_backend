const express = require("express");
const multer = require("multer");
const { storage } = require("../config/cloudinaryConfig");
const {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/teamController");

const router = express.Router();
const upload = multer({ storage });

router.get("/", getTeamMembers);
router.post(
  "/",
  upload.single("image"), // Assuming you want to upload a single image for the team member
  createTeamMember
); // Multer handles image uploads
router.put("/:id", updateTeamMember);
router.delete("/:id", deleteTeamMember);

module.exports = router;
