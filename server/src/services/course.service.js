const db = require('../config/db');

// Lấy tất cả course
const getAllCourses = async () => {
  try {
    const rows = await db.query('SELECT * FROM COURSE ORDER BY CourseID')
    return rows
  } catch (error) {
    console.error('Error getting all courses:', error);
    throw error;
  }
};

// Lấy 1 course theo ID
const getCourseById = async (id) => {
  try {
    const rows = await db.query('SELECT * FROM COURSE WHERE CourseID = ?', [id])
    return rows[0]
  } catch (error) {
    console.error('Error getting course by ID:', error);
    throw error;
  }
};

// Tạo course mới
const createCourse = async (data) => {
  if (!data.name || data.name.trim() === '') {
    const err = new Error('Course name is required');
    err.statusCode = 400;
    throw err;
  }

  if (data.price == null || data.price < 0) {
    const err = new Error('Price must be >= 0');
    err.statusCode = 400;
    throw err;
  }

  if (data.duration == null || data.duration <= 0) {
    const err = new Error('Duration must be > 0');
    err.statusCode = 400;
    throw err;
  }

  try {
    if (db.client === 'mysql') {
      const [res] = await db.raw(`INSERT INTO COURSE (Name, Description, Category, Language, Price, Duration, InstructorID) VALUES (?, ?, ?, ?, ?, ?, ?)`, [data.name, data.description || null, data.category || null, data.language || null, data.price, data.duration, data.instructorId || 1])
      const newCourseId = res && res.insertId
      const newCourse = await getCourseById(newCourseId)
      return newCourse
    } else {
      const rows = await db.query(`INSERT INTO COURSE (Name, Description, Category, Language, Price, Duration, InstructorID) VALUES (?, ?, ?, ?, ?, ?, ?); SELECT SCOPE_IDENTITY() as CourseID`, [data.name, data.description || null, data.category || null, data.language || null, data.price, data.duration, data.instructorId || 1])
      const newCourseId = rows && rows[0] && rows[0].CourseID
      const newCourse = await getCourseById(newCourseId);
      return newCourse;
    }
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

// Cập nhật course
const updateCourse = async (id, data) => {
  if (data.price !== undefined && data.price < 0) {
    const err = new Error('Price must be >= 0');
    err.statusCode = 400;
    throw err;
  }

  if (data.duration !== undefined && data.duration <= 0) {
    const err = new Error('Duration must be > 0');
    err.statusCode = 400;
    throw err;
  }

  try {
    const updateFields = [];
    const params = [];
    const addParam = (value) => { params.push(value); return '?'; }
    
    if (data.name) {
      updateFields.push('Name = ' + addParam(data.name));
    }
    if (data.description !== undefined) {
      updateFields.push('Description = ' + addParam(data.description));
    }
    if (data.category !== undefined) {
      updateFields.push('Category = ' + addParam(data.category));
    }
    if (data.language !== undefined) {
      updateFields.push('Language = ' + addParam(data.language));
    }
    if (data.price !== undefined) {
      updateFields.push('Price = ' + addParam(data.price));
    }
    if (data.duration !== undefined) {
      updateFields.push('Duration = ' + addParam(data.duration));
    }

    if (updateFields.length === 0) {
      const err = new Error('No fields to update');
      err.statusCode = 400;
      throw err;
    }
    const result = await db.raw(`UPDATE COURSE SET ${updateFields.join(', ')} WHERE CourseID = ?`, [...params, id])

    // For MySQL, result[0].affectedRows; for MSSQL, result.rowsAffected
    const affected = (db.client === 'mysql') ? result[0].affectedRows : (result.rowsAffected ? result.rowsAffected[0] : 0)
    if (affected === 0) {
      const err = new Error('Course not found');
      err.statusCode = 404;
      throw err;
    }

    const updatedCourse = await getCourseById(id);
    return updatedCourse;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

// Xoá course
const deleteCourse = async (id) => {
  try {
    const course = await getCourseById(id);
    if (!course) {
      const err = new Error('Course not found');
      err.statusCode = 404;
      throw err;
    }

    const result = await db.raw('DELETE FROM COURSE WHERE CourseID = ?', [id])
    const affected = (db.client === 'mysql') ? result[0].affectedRows : (result.rowsAffected ? result.rowsAffected[0] : 0)
    if (affected === 0) {
      const err = new Error('Course not found');
      err.statusCode = 404;
      throw err;
    }

    return course;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
