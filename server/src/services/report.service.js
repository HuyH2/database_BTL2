const reportRepo = require('../repositories/report.repository');

/**
 * Get students by major with validation
 * @param {string} major - Major to filter by
 * @returns {Array} List of students
 */
async function getStudentsByMajorService(major) {
  try {
    // Minimal validation
    if (!major) {
      const error = new Error('Major is required');
      error.statusCode = 400;
      throw error;
    }

    // Call repository
    const students = await reportRepo.getStudentsByMajor(major);
    return students;
    
  } catch (error) {
    // Re-throw if already has statusCode
    if (error.statusCode) {
      throw error;
    }
    
    // Handle unexpected errors
    console.error('Service error in getStudentsByMajorService:', error);
    const newError = new Error('Failed to get students by major');
    newError.statusCode = 500;
    throw newError;
  }
}

/**
 * Get course statistics with validation
 * @param {string|number} minStudents - Minimum number of students
 * @returns {Array} List of course statistics
 */
async function getCourseStatsService(minStudents) {
  try {
    // Convert to integer and validate
    const minStudentsInt = parseInt(minStudents);
    
    if (isNaN(minStudentsInt) || minStudents === undefined || minStudents === null) {
      const error = new Error('minStudents must be a number');
      error.statusCode = 400;
      throw error;
    }

    // Call repository
    const stats = await reportRepo.getCourseStats(minStudentsInt);
    return stats;
    
  } catch (error) {
    // Re-throw if already has statusCode
    if (error.statusCode) {
      throw error;
    }
    
    // Handle unexpected errors
    console.error('Service error in getCourseStatsService:', error);
    const newError = new Error('Failed to get course statistics');
    newError.statusCode = 500;
    throw newError;
  }
}

module.exports = {
  getStudentsByMajorService,
  getCourseStatsService,
};