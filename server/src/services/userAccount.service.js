const bcrypt = require('bcryptjs');
const userAccountRepository = require('../repositories/userAccount.repository');

/**
 * UserAccount Service - Business logic for USER_ACCOUNT operations
 */
class UserAccountService {

  /**
   * List all users
   */
  async listUsers() {
    try {
      const users = await userAccountRepository.getAllUsers();
      
      // Convert to camelCase for API response
      return users.map(user => ({
        userId: user.UserID,
        userName: user.UserName,
        email: user.Email,
        gender: user.Gender,
        dateOfBirth: user.DateOfBirth,
        status: user.Status,
        organizationId: user.OrganizationID
      }));
    } catch (error) {
      console.error('Service listUsers error:', error.message);
      const newError = new Error('Failed to get users');
      newError.statusCode = 500;
      throw newError;
    }
  }

  /**
   * Get user by ID
   */
  async getUser(id) {
    try {
      const users = await userAccountRepository.getUserById(id);
      
      if (users.length === 0) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }

      const user = users[0];
      
      // Convert to camelCase for API response
      return {
        userId: user.UserID,
        userName: user.UserName,
        email: user.Email,
        gender: user.Gender,
        dateOfBirth: user.DateOfBirth,
        status: user.Status,
        organizationId: user.OrganizationID
      };
    } catch (error) {
      if (error.statusCode) {
        throw error;
      }
      
      console.error('Service getUser error:', error.message);
      const newError = new Error('Failed to get user');
      newError.statusCode = 500;
      throw newError;
    }
  }

  /**
   * Create new user
   */
  async createUser(data) {
    try {
      // Minimal checks in JS
      if (!data.userName || !data.email || !data.password) {
        const error = new Error('Missing required fields');
        error.statusCode = 400;
        throw error;
      }

      // Hash password
      const hashed = await bcrypt.hash(data.password, 10);

      // Call repository
      await userAccountRepository.addUser({
        userName: data.userName,
        email: data.email,
        userPassword: hashed,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        status: data.status || 'Active',
        organizationId: data.organizationId ?? null
      });

      return {
        success: true,
        message: 'User created successfully'
      };

    } catch (error) {
      console.error('Service createUser error:', error);
      
      // Re-throw if already has statusCode
      if (error.statusCode) {
        throw error;
      }

      // Handle SQL Server validation errors from stored procedure
      if (error.originalError?.info?.message || 
          error.message.includes('Invalid email format') ||
          error.message.includes('Email already exists') ||
          error.message.includes('Gender must be M or F') ||
          error.message.includes('Date of birth must be less than current date') ||
          error.message.includes('OrganizationID does not exist')) {
        
        const newError = new Error(error.originalError?.info?.message || error.message);
        newError.statusCode = 400;
        throw newError;
      }

      // Unexpected errors
      const newError = new Error('Failed to create user');
      newError.statusCode = 500;
      throw newError;
    }
  }

  /**
   * Update existing user
   */
  async updateUser(id, data) {
    try {
      // Check if user exists
      const existingUsers = await userAccountRepository.getUserById(id);
      if (existingUsers.length === 0) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }

      const existingUser = existingUsers[0];

      // Prepare mapped data
      const mappedData = {
        userName: data.userName || existingUser.UserName,
        email: data.email || existingUser.Email,
        gender: data.gender || existingUser.Gender,
        dateOfBirth: data.dateOfBirth || existingUser.DateOfBirth,
        status: data.status || existingUser.Status,
        organizationId: data.organizationId !== undefined ? data.organizationId : existingUser.OrganizationID
      };

      // Handle password
      if (data.password) {
        // Hash new password
        mappedData.userPassword = await bcrypt.hash(data.password, 10);
      } else {
        // Get existing password from database
        const userWithPassword = await userAccountRepository.findUserByEmailForLogin(existingUser.Email);
        mappedData.userPassword = userWithPassword.UserPassword;
      }

      // Call repository
      await userAccountRepository.updateUser(id, mappedData);

      return {
        success: true,
        message: 'User updated successfully'
      };

    } catch (error) {
      console.error('Service updateUser error:', error);
      
      // Re-throw if already has statusCode
      if (error.statusCode) {
        throw error;
      }

      // Handle SQL Server validation errors
      if (error.originalError?.info?.message || 
          error.message.includes('UserID does not exist') ||
          error.message.includes('Invalid email format') ||
          error.message.includes('Email already belongs to another user') ||
          error.message.includes('Gender must be M or F') ||
          error.message.includes('Date of birth must be less than current date') ||
          error.message.includes('OrganizationID does not exist')) {
        
        const newError = new Error(error.originalError?.info?.message || error.message);
        newError.statusCode = 400;
        throw newError;
      }

      // Unexpected errors
      const newError = new Error('Failed to update user');
      newError.statusCode = 500;
      throw newError;
    }
  }

  /**
   * Remove user
   */
  async removeUser(id) {
    try {
      // Check if user exists
      const existingUsers = await userAccountRepository.getUserById(id);
      if (existingUsers.length === 0) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }

      // Call repository
      await userAccountRepository.deleteUser(id);

      return {
        success: true,
        message: 'User deleted successfully'
      };

    } catch (error) {
      console.error('Service removeUser error:', error);
      
      // Re-throw if already has statusCode
      if (error.statusCode) {
        throw error;
      }

      // Handle SQL Server constraint errors from stored procedure
      if (error.originalError?.info?.message || 
          error.message.includes('UserID does not exist') ||
          error.message.includes('Cannot delete because User is a STUDENT') ||
          error.message.includes('Cannot delete because User is an INSTRUCTOR') ||
          error.message.includes('Cannot delete because User is an ADMIN') ||
          error.message.includes('Cannot delete because User has created POSTS') ||
          error.message.includes('Cannot delete because User has created FORUMS') ||
          error.message.includes('Cannot delete because User is a MODERATOR')) {
        
        const newError = new Error(error.originalError?.info?.message || error.message);
        newError.statusCode = 400;
        throw newError;
      }

      // Unexpected errors
      const newError = new Error('Failed to delete user');
      newError.statusCode = 500;
      throw newError;
    }
  }

  // ========== LEGACY METHODS FOR COMPATIBILITY ==========

  /**
   * Get all users (alias for listUsers)
   */
  async getAllUsers() {
    return this.listUsers();
  }

  /**
   * Get user by ID (alias for getUser)
   */
  async getUserById(userId) {
    return this.getUser(userId);
  }

  /**
   * Delete user (alias for removeUser)
   */
  async deleteUser(userId) {
    return this.removeUser(userId);
  }
}

module.exports = new UserAccountService();