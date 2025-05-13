const mongoose = require('mongoose');

// Define the TestimonialUser schema
const testimonialUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String, 
    },
    description: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create the TestimonialUser model
const TestimonialUser = mongoose.model('TestimonialUser', testimonialUserSchema);

module.exports = TestimonialUser;
