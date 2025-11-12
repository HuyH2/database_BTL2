const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/items.controller')

router.get('/', ctrl.list)
router.get('/search', ctrl.search)
router.get('/:id', ctrl.detail)
router.post('/', ctrl.create)
router.post('/:id/score', ctrl.score)

module.exports = router
