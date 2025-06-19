const TestimonialUser = require('../models/Testimonial');
const multer = require('multer');
const path = require('path');

// Configure Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to "uploads" directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter for only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    }
    cb(new Error('Only JPEG, JPG, and PNG files are allowed!'));
};

// Middleware to handle file upload
const upload = multer({ storage, fileFilter }).single('image');

// Create TestimonialUser
// const createTestimonialUser = async (req, res) => {
//     upload(req, res, async (err) => {
//         if (err) return res.status(400).json({ message: err.message });

//         try {
//             const { name, description, position } = req.body;
//             if (!name || !description || !position) {
//                 return res.status(400).json({ message: 'Name, description, and position are required' });
//             }

//             const imageUrl = req.file ? `/uploads/${req.file.filename}` : ''; // Store relative image path

//             const newTestimonialUser = new TestimonialUser({ name, image: imageUrl, description, position });
//             const savedTestimonialUser = await newTestimonialUser.save();

//             res.status(201).json({
//                 message: 'Testimonial created successfully',
//                 testimonialUser: savedTestimonialUser,
//             });
//         } catch (error) {
//             res.status(500).json({ message: 'Server error', error });
//         }
//     });
// };

const createTestimonialUser = async (req, res) => {
  try {
    const { name, description, position } = req.body;

    if (!req.file || !name || !description || !position) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const imageUrl = req.file.path;

    const newTestimonial = new Testimonial({
      name,
      description,
      position,
      image: imageUrl,
    });

    await newTestimonial.save();

    res.status(201).json({ message: "Testimonial created successfully", newTestimonial });
  } catch (err) {
    console.error("Create testimonial error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



// Get all testimonials
const getTestimonialUsers = async (req, res) => {
    try {
        const testimonials = await TestimonialUser.find();
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update a testimonial
const updateTestimonialUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Validation
        if (!id) {
            return res.status(400).json({ message: 'TestimonialUser ID is required' });
        }

        const updatedTestimonialUser = await TestimonialUser.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTestimonialUser) {
            return res.status(404).json({ message: 'TestimonialUser not found' });
        }

        res.status(200).json({
            message: 'Testimonial updated successfully',
            testimonialUser: updatedTestimonialUser,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a testimonial
const deleteTestimonialUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Validation
        if (!id) {
            return res.status(400).json({ message: 'TestimonialUser ID is required' });
        }

        const deletedTestimonialUser = await TestimonialUser.findByIdAndDelete(id);

        if (!deletedTestimonialUser) {
            return res.status(404).json({ message: 'TestimonialUser not found' });
        }

        res.status(200).json({ message: 'Testimonial deleted successfully', testimonialUser: deletedTestimonialUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { createTestimonialUser, getTestimonialUsers, updateTestimonialUser, deleteTestimonialUser };