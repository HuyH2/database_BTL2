const db = require('../config/db')

exports.findByCourse = async (courseId) => {
  return await db.query('SELECT ForumID as id, Name as name, Description, Create_Date as createDate, CreatorID as creatorId, CourseID FROM FORUM WHERE CourseID = ?', [courseId])
}

exports.findById = async (id) => {
  const rows = await db.query('SELECT * FROM FORUM WHERE ForumID = ?', [id])
  return rows[0] || null
}

exports.getPosts = async (forumId) => {
  return await db.query('SELECT PostID as id, ForumID, AuthorID, Content, Create_Date as createDate FROM POST WHERE ForumID = ?', [forumId])
}

exports.createPost = async (forumId, data) => {
  if (db.client === 'mysql') {
    const [res] = await db.raw('INSERT INTO POST (ForumID, AuthorID, Content) VALUES (?, ?, ?)', [forumId, data.AuthorID, data.Content])
    return { insertId: res.insertId }
  }
  const rows = await db.query('INSERT INTO POST (ForumID, AuthorID, Content) VALUES (?, ?, ?); SELECT SCOPE_IDENTITY() as PostID', [forumId, data.AuthorID, data.Content])
  return { insertId: rows && rows[0] && rows[0].PostID }
}

module.exports = exports
