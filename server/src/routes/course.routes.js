const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');

// GET /api/courses
router.get('/', courseController.getCourses);

// GET /api/courses/:id
router.get('/:id', courseController.getCourse);

// POST /api/courses
router.post('/', courseController.createCourse);

// PUT /api/courses/:id
router.put('/:id', courseController.updateCourse);

// DELETE /api/courses/:id
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
