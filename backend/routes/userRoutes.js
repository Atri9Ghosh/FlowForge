const express = require('express');
const router = express.Router();
const { getUserProfile, createUser } = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(authenticate);

// Get user profile
router.get('/profile', getUserProfile);

// Create user (called during signup)
router.post('/', createUser);

module.exports = router;