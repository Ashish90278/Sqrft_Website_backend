const express = require('express');
const { login, signup } = require('../controllers/authController');

const router = express.Router();

// Login Route
router.post('/login', login);

// Signup Route
router.post('/signup', signup);

module.exports = router;
