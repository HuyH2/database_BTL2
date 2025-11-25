const db = require('../config/db')

exports.findAll = async ({ q } = {}) => {
  try {
    if (q) return await db.query('SELECT * FROM COURSE WHERE Name LIKE ?', [`%${q}%`])
    // return columns matching client expectations (id, title, price, image, description)
    return await db.query('SELECT CourseID as id, Name as title, Description, Price, NULL as image FROM COURSE')
  } catch (error) {
    console.error('Error finding all items (courses):', error)
    throw error
  }
}

exports.search = exports.findAll

exports.findById = async (id) => {
  try {
    const rows = await db.query('SELECT CourseID as id, Name as title, Description, Price, NULL as image FROM COURSE WHERE CourseID = ?', [id])
    return rows[0] || null
  } catch (error) {
    console.error('Error finding item by id:', error)
    throw error
  }
}

exports.create = async (data) => {
  try {
    // Try stored procedure - callProcedure returns rows if used
    try {
      const res = await db.callProcedure('create_item', [data.name, data.description])
      // If procedure returns insert id in some format, try to read
      if (res && res[0] && res[0].insertId) return { insertId: res[0].insertId }
    } catch (procErr) {
      // ignore and fallback
    }

    // Fallback to direct INSERT
    if (db.client === 'mysql') {
      const [result] = await db.raw('INSERT INTO items (name, description) VALUES (?, ?)', [data.name, data.description])
      const insertId = result && result.insertId
      return { insertId }
    } else {
      // mssql: use query returning SCOPE_IDENTITY()
      const rows = await db.query('INSERT INTO items (name, description) VALUES (?, ?); SELECT SCOPE_IDENTITY() as insertId', [data.name, data.description])
      const insertId = rows && rows[0] && rows[0].insertId
      return { insertId }
    }
  } catch (error) {
    console.error('Error creating item:', error)
    throw error
  }
}

exports.score = async (id) => {
  try {
    try {
      const res = await db.callProcedure('calculate_score', [id])
      return { score: (res && res[0] && res[0].score) || 0 }
    } catch (procErr) {
      return { score: 0 }
    }
  } catch (error) {
    console.error('Error calculating score:', error)
    return { score: 0 }
  }
}
