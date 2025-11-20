const db = require('../config/db')

exports.findAll = async ({ q }={})=>{
  if(q) return await db.query('SELECT * FROM items WHERE name LIKE ?', [`%${q}%`])
  return await db.query('SELECT * FROM items')
}

exports.search = exports.findAll

exports.findById = async (id)=>{
  const rows = await db.query('SELECT * FROM items WHERE id=?', [id])
  return rows[0] || null
}

exports.create = async (data)=>{
  if(db.callProcedure){
    return await db.callProcedure('create_item', [data.name, data.description])
  }
  const res = await db.query('INSERT INTO items (name, description) VALUES (?, ?)', [data.name, data.description])
  return { insertId: res.insertId }
}

exports.score = async (id)=>{
  // example of calling a function/procedure that calculates a score
  if(db.callProcedure) return await db.callProcedure('calculate_score', [id])
  // fallback: return dummy
  return { score: 0 }
}
