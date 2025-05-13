const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'drvphnwxq',
  api_key: '745563548647795',
  api_secret: 'BZoGN94cSaLuNtHAx424iQNkRZQ'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'FormUploads',
    resource_type: 'auto', // Automatically detect the resource type (image, video, etc.)
    public_id: (req, file) => file.filename,
    format: (req, file) => file.originalname.split('.').pop(), // Use the original file format
  },
});

module.exports = { cloudinary, storage };