const authService = require('../services/auth.service');

/**
 * Register new user
 * POST /api/auth/register
 */
async function register(req, res) {
  try {
    const result = await authService.register(req.body);
    return res.status(201).json(result);
  } catch (err) {
    return res
      .status(err.statusCode || 500)
      .json({ message: err.message });
  }
}

/**
 * Login user
 * POST /api/auth/login
 */
async function login(req, res) {
  try {
    const result = await authService.loginUser(req.body);
    
    // Handle different result types from loginUser
    if (result.error) {
      if (result.code === 'MISSING_FIELD') {
        return res.status(400).json({ message: result.error });
      }
      if (result.code === 'INVALID_CREDENTIALS') {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      if (result.code === 'ACCOUNT_INACTIVE') {
        return res.status(403).json({ message: 'Account is not active' });
      }
    }

    // Success response with JWT token
    res.status(200).json({
      message: 'Login success',
      user: result.user,
      token: result.token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { register, login };
