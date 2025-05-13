const express = require("express");
const multer = require("multer");
const { storage } = require("../config/cloudinaryConfig");
const {
  submitForm,
  getForms,
  deleteForm,
  getPropertiesDetails,
} = require("../controllers/formController");

const router = express.Router();
const upload = multer({ storage });

router.post(
  "/submit",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "floorPlans", maxCount: 5 },
  ]),
  submitForm
);



router.get("/", getForms);
router.get("/view/:id", getPropertiesDetails);
router.delete("/:id", deleteForm);

module.exports = router;
