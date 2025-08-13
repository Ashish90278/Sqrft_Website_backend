const mongoose = require("mongoose");

// Define Schema for the Form
const FormSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  aboutBuilder: { type: String },
  address: { type: String },
  area: { type: String },
  price: { type: String },
  rooms: { type: String },
  baths: { type: String },
  propertyStatus: { type: String },
  yearBuilt: { type: String },
  amenities: { type: [String], default: [] },
  features: { type: [String], default: [] },
  floorPlans: { type: [String], default: [] },
  images: { type: [String], default: [] },
  lotDimensions: { type: String },
  reraDetails: { type: String, default:"no" },
  disclaimer: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Create and Export the Mongoose Model
const FormModel = mongoose.model("Form", FormSchema);

module.exports = FormModel;
