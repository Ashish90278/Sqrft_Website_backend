const mongoose = require('mongoose');

// Define the TestimonialUser schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    para_1: {
        type: String,
        required: true,
    },
    para_2: {
        type: String,
        required: true,
    },
    conclusion: {
        type: String,
        required: true,
    },
    viewCount: {
        type: Number,
        default: 0,
    },
    writtenBy: {
        type: String,
        required: true,
    },
    image: {
        type: String, 
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create the TestimonialUser model
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;