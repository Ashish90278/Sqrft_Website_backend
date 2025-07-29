const Team = require('../models/teamModel');
const multer = require('multer');
const path = require('path');

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


// const createTeamMember = async (req, res) => {

//     console.log("req.body", req.body); // Log the request body to see the data being sent
//     console.log("req.file", req.file); // Log the uploaded file information

//     upload(req, res, async (err) => {
//         if (err) return res.status(400).json({ message: err.message });

//         try {
//             const { name, position } = req.body;

//             console.log("data", name, position); // Log the uploaded file information
//             if (!name || !position) {
//                 return res.status(400).json({ message: 'Name and position are required' });
//             }

//             const imageUrl = req.file ? `/uploads/${req.file.filename}` : ''; // Store relative image path

//             const newTeamMember = new Team({ name, image: imageUrl, position });
//             const savedTeamMember = await newTeamMember.save();

//             res.status(201).json({
//                 message: 'Team member created successfully',
//                 teamMember: savedTeamMember,
//             });
//         } catch (error) {
//             res.status(500).json({ message: 'Server error', error });
//         }
//     });
// };

const createTeamMember = async (req, res) => {
    
  try {

    const { name, position } = req.body;

    if (!name || !position) {
      return res.status(400).json({ message: 'Name and position are required' });
    }

    const imageUrl = req.file.filename;

    const newTeamMember = new Team({ name, image: imageUrl, position });
    const savedTeamMember = await newTeamMember.save();

    res.status(201).json({
      message: 'Team member created successfully',
      teamMember: savedTeamMember,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


const getTeamMembers = async (req, res) => {
    try {
        const teamMembers = await Team.find();
        res.status(200).json(teamMembers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const updateTeamMember = async (req, res) => {
    const { id } = req.params;
    upload(req, res, async (err) => {
        if (err) return res.status(400).json({ message: err.message });

        try {
            const { name, position } = req.body;
            if (!name || !position) {
                return res.status(400).json({ message: 'Name and position are required' });
            }

            const imageUrl = req.file ? `/uploads/${req.file.filename}` : ''; // Store relative image path

            const updatedTeamMember = await Team.findByIdAndUpdate(
                id,
                { name, image: imageUrl, position },
                { new: true }
            );

            if (!updatedTeamMember) {
                return res.status(404).json({ message: 'Team member not found' });
            }

            res.status(200).json({
                message: 'Team member updated successfully',
                teamMember: updatedTeamMember,
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    });
};
const deleteTeamMember = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTeamMember = await Team.findByIdAndDelete(id);

        if (!deletedTeamMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        res.status(200).json({
            message: 'Team member deleted successfully',
            teamMember: deletedTeamMember,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};      

module.exports = {
    getTeamMembers,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
};