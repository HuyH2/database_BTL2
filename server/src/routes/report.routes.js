const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');

/**
 * Report Routes - Read-only endpoints for data reports
 */

// GET /api/students/by-major?major=IT
router.get('/api/students/by-major', reportController.getStudentsByMajor);

// GET /api/courses/stats?minStudents=5
router.get('/api/courses/stats', reportController.getCourseStats);

module.exports = router;