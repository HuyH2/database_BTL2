const express = require('express');
const router = express.Router();
const userController = require('../controllers/userAccount.controller');

/**
 * User Routes - Read/Update/Delete only
 * Note: Create is handled by Register API (/api/auth/register)
 */

router.get('/api/users', userController.getAll);
router.get('/api/users/:id', userController.getById);
router.put('/api/users/:id', userController.update);
router.delete('/api/users/:id', userController.remove);

module.exports = router;