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
    /**
 * Check Email Exists (Forgot Password Step 1)
 * POST /api/auth/check-email
 */
async function checkEmail(req, res) {
  try {
    const { email } = req.body;
    const exists = await authService.checkEmail(email);
    
    res.status(200).json({
      success: true,
      exists: exists
    });
  } catch (error) {
    console.error('CheckEmail error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * Get Current User Info (Refresh Page)
 * GET /api/auth/me
 */
async function getMe(req, res) {
  try {
    // TODO: Lấy ID từ Token (req.user.id) khi có middleware
    // Tạm thời fix cứng ID=1 để test
    const userId = 1; 

    const user = await authService.getUserById(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user.UserID,
        name: user.UserName,
        email: user.Email,
        role: user.Role, 
        avatar: 'https://i.pravatar.cc/150?img=' + user.UserID
      }
    });
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * Reset Password
 * POST /api/auth/reset-password
 */
async function resetPassword(req, res) {
  try {
    const { email, newPassword } = req.body;
    await authService.resetPassword(email, newPassword);
    
    res.status(200).json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('ResetPassword error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * Logout
 * POST /api/auth/logout
 */
async function logout(req, res) {
  try {
    // Xử lý xóa token ở server nếu cần (Redis/DB)
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Export tất cả các hàm
module.exports = {
  register,
  login,
  checkEmail,
  getMe,
  resetPassword,
  logout
};

module.exports = { register, login };
