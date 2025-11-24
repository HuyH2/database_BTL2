const { getPool, sql } = require('../config/database');

// Lấy tất cả course
const getAllCourses = async () => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM COURSE ORDER BY CourseID');
    return result.recordset;
  } catch (error) {
    console.error('Error getting all courses:', error);
    throw error;
  }
};

// Lấy 1 course theo ID
const getCourseById = async (id) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('CourseID', sql.Int, id)
      .query('SELECT * FROM COURSE WHERE CourseID = @CourseID');
    return result.recordset[0];
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
    const pool = await getPool();
    const result = await pool.request()
      .input('Name', sql.NVarChar, data.name)
      .input('Description', sql.NVarChar, data.description || null)
      .input('Category', sql.NVarChar, data.category || null)
      .input('Language', sql.NVarChar, data.language || null)
      .input('Price', sql.Decimal, data.price)
      .input('Duration', sql.Int, data.duration)
      .input('InstructorID', sql.Int, data.instructorId || 1)
      .query(`
        INSERT INTO COURSE (Name, Description, Category, Language, Price, Duration, InstructorID) 
        VALUES (@Name, @Description, @Category, @Language, @Price, @Duration, @InstructorID);
        SELECT SCOPE_IDENTITY() as CourseID;
      `);

    // Lấy course vừa tạo
    const newCourseId = result.recordset[0].CourseID;
    const newCourse = await getCourseById(newCourseId);
    return newCourse;
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
    const pool = await getPool();
    
    // Tạo câu query động
    const updateFields = [];
    const request = pool.request().input('CourseID', sql.Int, id);

    if (data.name) {
      updateFields.push('Name = @Name');
      request.input('Name', sql.NVarChar, data.name);
    }
    if (data.description !== undefined) {
      updateFields.push('Description = @Description');
      request.input('Description', sql.NVarChar, data.description);
    }
    if (data.category !== undefined) {
      updateFields.push('Category = @Category');
      request.input('Category', sql.NVarChar, data.category);
    }
    if (data.language !== undefined) {
      updateFields.push('Language = @Language');
      request.input('Language', sql.NVarChar, data.language);
    }
    if (data.price !== undefined) {
      updateFields.push('Price = @Price');
      request.input('Price', sql.Decimal, data.price);
    }
    if (data.duration !== undefined) {
      updateFields.push('Duration = @Duration');
      request.input('Duration', sql.Int, data.duration);
    }

    if (updateFields.length === 0) {
      const err = new Error('No fields to update');
      err.statusCode = 400;
      throw err;
    }

    const result = await request.query(
      `UPDATE COURSE SET ${updateFields.join(', ')} WHERE CourseID = @CourseID`
    );

    if (result.rowsAffected[0] === 0) {
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

    const pool = await getPool();
    const result = await pool.request()
      .input('CourseID', sql.Int, id)
      .query('DELETE FROM COURSE WHERE CourseID = @CourseID');
    
    if (result.rowsAffected[0] === 0) {
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
