const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/db.controller')

router.post('/init', ctrl.init)
router.get('/check', ctrl.check)
router.post('/clear', ctrl.clear)

module.exports = router
