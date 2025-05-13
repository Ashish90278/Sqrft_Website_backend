const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    phone: { type: String, required: true },
    coverLetter: { type: String },
    resumeUrl: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", ApplicationSchema);
