const db = require('../config/db')

exports.findByLesson = async (lessonId) => {
  return await db.query('SELECT ContentID as id, Title as title, Description, Date_Create as dateCreate, LessonID FROM CONTENT_ITEM WHERE LessonID = ?', [lessonId])
}

exports.findById = async (id) => {
  const rows = await db.query('SELECT * FROM CONTENT_ITEM WHERE ContentID = ?', [id])
  return rows[0] || null
}

// TODO: add create/update for video/quiz/document as needed

module.exports = exports
