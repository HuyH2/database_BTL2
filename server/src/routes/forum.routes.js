const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/forum.controller')

// GET /api/forum?courseId=1
router.get('/', ctrl.list)
// GET /api/forum/:id
router.get('/:id', ctrl.detail)
// GET /api/forum/:id/posts
router.get('/:id/posts', ctrl.getPosts)
// POST /api/forum/:id/posts
router.post('/:id/posts', ctrl.createPost)

module.exports = router
