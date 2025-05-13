const { default: mongoose } = require('mongoose');
const FormModel = require('../models/formModel');


// Handle Form Submission (POST)
const submitForm = async (req, res) => {
    try {
        const formData = req.body;

        console.log("Form Data:", formData);
        
        const images = req.files['images'] ? req.files['images'].map(file => file.path) : [];
        const floorPlans = req.files['floorPlans'] ? req.files['floorPlans'].map(file => file.path) : [];

        const newForm = new FormModel({
            ...formData,
            images,
            floorPlans,
        });

        const savedForm = await newForm.save();

        console.log('Form Submitted Successfully:', savedForm);
        return res.status(200).json({
            message: 'Form submitted successfully!',
            data: savedForm
        });
    } catch (error) {
        console.error('Error Submitting Form:', error);
        return res.status(500).json({
            message: 'Server Error from Submit form!',
            error: error.message
        });
    }
};


// Handle Fetching Forms (GET)
const getForms = async (req, res) => {
    try {
        // Fetch all forms from the database
        const forms = await FormModel.find();

        // Respond with the fetched data
        return res.status(200).json({
            message: 'Forms fetched successfully!',
            data: forms,
        });
    } catch (error) {
        console.error('Error Fetching Forms:', error.message);
        return res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
};

// Handle one details property
const getPropertiesDetails = async (req, res) => {
    try {
        // Extract ID from request parameters
        const { id } = req.params;

        console.log("Received ID:", id);

        // Validate if ID is provided
        if (!id) {
            return res.status(400).json({
                message: 'ID parameter is required',
            });
        }

        // Validate if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid ID format',
            });
        }

        // Find the specific form by ID
        const form = await FormModel.findById(id);

        // Check if the form exists
        if (!form) {
            return res.status(404).json({
                message: 'Form not found',
            });
        }

        // Respond with the fetched form
        return res.status(200).json({
            message: 'Form fetched successfully!',
            data: form,
        });
    } catch (error) {
        console.error('Error Fetching Form by ID:', error);
        return res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
};

// Handle Delete Form (DELETE)
const deleteForm = async (req, res) => {
    try {
        const { id } = req.params;

        console.log('Full Params Object:', req.params);
        // Debugging logs
        console.log("Request URL:", req.originalUrl);
        console.log("ID:", id);

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Find and delete form by ID
        const deletedForm = await FormModel.findByIdAndDelete(id);

        if (!deletedForm) {
            return res.status(404).json({
                message: 'Form not found',
            });
        }

        return res.status(200).json({
            message: 'Form deleted successfully!',
            data: deletedForm,
        });
    } catch (error) {
        console.error('Error Deleting Form:', error.message);
        return res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
};


module.exports = { submitForm, getForms, deleteForm, getPropertiesDetails };