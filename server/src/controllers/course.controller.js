const courseService = require('../services/course.service');

const getCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error('getCourses error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await courseService.getCourseById(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }
    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error('getCourse error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const createCourse = async (req, res) => {
  try {
    const course = await courseService.createCourse(req.body);
    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error('createCourse error:', error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await courseService.updateCourse(id, req.body);
    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error('updateCourse error:', error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await courseService.deleteCourse(id);
    res.json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    console.error('deleteCourse error:', error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
