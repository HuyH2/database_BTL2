const db = require('../config/db')

exports.findByCourse = async (courseId) => {
  return await db.query('SELECT LessonID as id, Lesson_No as number, Process_Pct as processPct, CourseID FROM LESSON WHERE CourseID = ?', [courseId])
}

exports.findById = async (id) => {
  const rows = await db.query('SELECT * FROM LESSON WHERE LessonID = ?', [id])
  return rows[0] || null
}

exports.create = async (courseId, data) => {
  if (db.client === 'mysql') {
    const [res] = await db.raw('INSERT INTO LESSON (Lesson_No, Process_Pct, CourseID) VALUES (?, ?, ?)', [data.Lesson_No || 1, data.Process_Pct || 0, courseId])
    return { insertId: res.insertId }
  } else {
    const rows = await db.query('INSERT INTO LESSON (Lesson_No, Process_Pct, CourseID) VALUES (?, ?, ?); SELECT SCOPE_IDENTITY() as LessonID', [data.Lesson_No || 1, data.Process_Pct || 0, courseId])
    return { insertId: rows && rows[0] && rows[0].LessonID }
  }
}
