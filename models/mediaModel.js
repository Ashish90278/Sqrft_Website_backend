const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    image: {
        type: String, // URL of the image stored in Cloudinary
        required: true,
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});
// Create the Media model
const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;