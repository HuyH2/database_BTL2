const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userAccount.repository');
const { poolPromise } = require('../config/db');
const sql = require('mssql');

/**
 * Register new user
 * @param {Object} data - Registration data
 * @returns {Object} Success result with user info
 */
async function register(data) {
  try {
    // Minimal validation - frontend does the rest
    if (!data.userName || !data.email || !data.password || !data.gender || !data.dateOfBirth) {
      const error = new Error('Missing required fields');
      error.statusCode = 400;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Call userRepository.addUser with mapped object
    await userRepository.addUser({
      userName: data.userName,
      email: data.email,
      userPassword: hashedPassword,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      status: data.status || 'Active',
      organizationId: data.organizationId ?? null
    });

    // Fetch the created user using findUserByEmail to get UserID
    const user = await userRepository.findUserByEmail(data.email);
    if (!user) {
      throw new Error('Failed to retrieve created user');
    }

    // Insert into role table based on data.role
    await insertUserRole(user.UserID, data.role, data);

    return {
      message: 'Register success',
      userId: user.UserID,
      role: data.role
    };

  } catch (err) {
    console.error('REGISTER ERROR:', err);
    const message = 
      err.originalError?.info?.message || 
      err.message || 
      'Internal server error';
    const error = new Error(message);
    error.statusCode = err.originalError ? 400 : (err.statusCode || 500);
    throw error;
  }
}

/**
 * Helper function to insert user into role-specific table
 * @param {number} userId - User ID
 * @param {string} role - User role (Student, Instructor, Admin)
 * @param {Object} data - Registration data (may contain major, educationLevel)
 */
async function insertUserRole(userId, role, data) {
  const pool = await poolPromise;
  
  if (role === 'Student') {
    await pool.request()
      .input('UserID', sql.Int, userId)
      .input('Major', sql.NVarChar, data?.major ?? null)
      .input('Education_Level', sql.NVarChar, data?.educationLevel ?? null)
      .query(`
        INSERT INTO STUDENT (UserID, Major, Education_Level)
        VALUES (@UserID, @Major, @Education_Level)
      `);
  } else if (role === 'Instructor') {
    await pool.request()
      .input('UserID', sql.Int, userId)
      .query('INSERT INTO INSTRUCTOR(UserID) VALUES(@UserID)');
  } else if (role === 'Admin') {
    await pool.request()
      .input('UserID', sql.Int, userId)
      .query('INSERT INTO ADMIN(UserID) VALUES(@UserID)');
  } else {
    throw new Error(`Invalid role: ${role}`);
  }
}

/**
 * Login user
 * @param {Object} data - Login data { email, password }
 * @returns {Object} Success: { user, token } | Error: { error, code }
 */
async function loginUser(data) {
  try {
    // Check required fields
    const requiredFields = ['email', 'password'];
    for (const field of requiredFields) {
      if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
        return { 
          error: `${field} is required`,
          code: 'MISSING_FIELD'
        };
      }
    }

    const trimmedEmail = data.email.trim();

    // Find user by email
    const user = await userRepository.findUserByEmailForLogin(trimmedEmail);
    if (!user) {
      return {
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      };
    }

    // Check account status
    if (user.Status !== 'Active') {
      return {
        error: 'Account is not active',
        code: 'ACCOUNT_INACTIVE'
      };
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(data.password, user.UserPassword);
    if (!passwordMatch) {
      return {
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      };
    }

    // Get user role
    const role = await userRepository.findRoleByUserId(user.UserID);

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'your-default-secret-key-change-this';
    const token = jwt.sign(
      { 
        userId: user.UserID, 
        role: role 
      },
      jwtSecret,
      { expiresIn: '1h' }
    );

    // Return user data (excluding password) with token
    const userData = {
      userId: user.UserID,
      userName: user.UserName,
      email: user.Email,
      role: role
    };

    return {
      user: userData,
      token: token
    };

  } catch (error) {
    console.error('Service error in loginUser:', error);
    throw error;
  }
}

module.exports = { register, loginUser };