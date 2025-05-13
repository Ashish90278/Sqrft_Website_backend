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

router.get("/", getTeamMembers);
router.post("/",
  upload.fields([
    { name: "image", maxCount: 1 }
  ]),
  createTeamMember); // Multer handles image uploads
router.put("/:id", updateTeamMember);
router.delete("/:id", deleteTeamMember);

module.exports = router;
