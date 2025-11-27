const express = require('express');
const router = express.Router();
const { register, login , checkEmail, getMe, resetPassword, logout} = require('../controllers/auth.controller');
const { register, login } = require('../controllers/auth.controller');

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', login);
router.post('/check-email', checkEmail);
router.get('/me', getMe);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);

module.exports = router;