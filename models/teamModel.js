const mongoose = require('mongoose');

// Define the TestimonialUser schema
const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String, 
    },
    position: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create the TestimonialUser model
const Team = mongoose.model('Team', teamSchema);

module.exports = Team;