const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/content.controller')

router.get('/', ctrl.list)
router.get('/:id', ctrl.detail)

module.exports = router
