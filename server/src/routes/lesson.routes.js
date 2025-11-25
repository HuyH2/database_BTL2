const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/lesson.controller')

// GET /api/lessons?courseId=1
router.get('/', ctrl.list)
// POST /api/lessons/:courseId
router.post('/:courseId', ctrl.create)

module.exports = router
