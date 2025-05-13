// Route: applicationRoutes.js
const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinaryConfig');
const upload = multer({ storage });

const {
    submitApplication,
    getApplications,
    getApplicationById,
    deleteApplication
} = require('../controllers/applicationController');

const router = express.Router();

// Routes
router.post('/applications', upload.single('resume'), submitApplication);
router.get('/applications', getApplications); 
router.get('/applications/:id', getApplicationById); 
router.delete('/applications/:id', deleteApplication);

module.exports = router;