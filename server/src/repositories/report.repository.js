const { poolPromise } = require('../config/db');
const sql = require('mssql');

/**
 * Get students by major using sp_GetStudentsByMajor stored procedure
 * @param {string} major - Major to filter by
 * @returns {Array} List of students with their details
 */
async function getStudentsByMajor(major) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('Major', sql.NVarChar, major)
    .execute('sp_GetStudentsByMajor');
  return result.recordset;
}

/**
 * Get course statistics using sp_GetCourseStats stored procedure
 * @param {number} minStudents - Minimum number of students filter
 * @returns {Array} List of courses with statistics
 */
async function getCourseStats(minStudents) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('MinStudents', sql.Int, minStudents)
    .execute('sp_GetCourseStats');
  return result.recordset;
}

module.exports = {
  getStudentsByMajor,
  getCourseStats,
};