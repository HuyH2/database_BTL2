const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/organization.controller')

router.get('/', ctrl.list)
router.get('/:id', ctrl.detail)
router.post('/', ctrl.create)
router.put('/:id', ctrl.update)
router.delete('/:id', ctrl.delete)

module.exports = router
