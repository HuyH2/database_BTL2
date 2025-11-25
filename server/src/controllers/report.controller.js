const reportService = require('../services/report.service');

/**
 * Get students by major
 * GET /api/students/by-major?major=...
 */
async function getStudentsByMajor(req, res) {
  try {
    const major = req.query.major;
    const students = await reportService.getStudentsByMajorService(major);
    return res.json(students);
  } catch (err) {
    return res
      .status(err.statusCode || 500)
      .json({ message: err.message });
  }
}

/**
 * Get course statistics
 * GET /api/courses/stats?minStudents=...
 */
async function getCourseStats(req, res) {
  try {
    const minStudents = req.query.minStudents;
    const stats = await reportService.getCourseStatsService(minStudents);
    return res.json(stats);
  } catch (err) {
    return res
      .status(err.statusCode || 500)
      .json({ message: err.message });
  }
}

module.exports = {
  getStudentsByMajor,
  getCourseStats,
};