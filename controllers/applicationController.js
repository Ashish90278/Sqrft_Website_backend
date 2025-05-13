// Controller: applicationController.js
const Application = require('../models/applicationModel');
const { cloudinary } = require('../config/cloudinaryConfig');

// Submit application (POST)
exports.submitApplication = async (req, res) => {
    try {
        const { fullName, email, role, phone, coverLetter } = req.body;
        const file = req.file;

        if (!file) return res.status(400).json({ message: 'Resume upload is required.' });

        // Save application to database
        const application = new Application({
            fullName,
            email,
            role,
            phone,
            coverLetter,
            resumeUrl: file.path, // Cloudinary provides the URL
        });

        await application.save();
        res.status(201).json({ message: 'Application submitted successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

// Get all applications (GET)
exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

// Get a single application by ID (GET)
exports.getApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await Application.findById(id);

        if (!application) return res.status(404).json({ message: 'Application not found' });

        res.status(200).json(application);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

// Delete an application by ID (DELETE)
exports.deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await Application.findByIdAndDelete(id);

        if (!application) return res.status(404).json({ message: 'Application not found' });

        // Optionally delete resume from Cloudinary
        if (application.resumeUrl) {
            const publicId = application.resumeUrl.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        res.status(200).json({ message: 'Application deleted successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};