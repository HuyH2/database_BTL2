const userAccountService = require('../services/userAccount.service');

/**
 * UserAccount Controller - HTTP request/response handling
 * Note: POST/Create is handled by Register API, this only handles Read/Update/Delete
 */

/**
 * Get all users
 * GET /api/users
 */
async function getAll(req, res) {
  try {
    const result = await userAccountService.listUsers();
    res.json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

/**
 * Get user by ID
 * GET /api/users/:id
 */
async function getById(req, res) {
  try {
    const userId = parseInt(req.params.id);
    const result = await userAccountService.getUser(userId);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

/**
 * Update user
 * PUT /api/users/:id
 */
async function update(req, res) {
  try {
    const userId = parseInt(req.params.id);
    await userAccountService.updateUser(userId, req.body);
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

/**
 * Remove user
 * DELETE /api/users/:id
 */
async function remove(req, res) {
  try {
    const userId = parseInt(req.params.id);
    await userAccountService.removeUser(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

module.exports = {
  getAll,
  getById,
  update,
  remove
};