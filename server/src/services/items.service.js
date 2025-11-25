const { getPool, sql } = require('../config/database');

exports.findAll = async ({ q } = {}) => {
  try {
    const pool = await getPool();
    if (q) {
      const result = await pool.request()
        .input('search', sql.NVarChar, `%${q}%`)
        .query('SELECT * FROM items WHERE name LIKE @search');
      return result.recordset;
    }
    const result = await pool.request().query('SELECT * FROM items');
    return result.recordset;
  } catch (error) {
    console.error('Error finding all items:', error);
    throw error;
  }
}

exports.search = exports.findAll

exports.findById = async (id) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM items WHERE id = @id');
    return result.recordset[0] || null;
  } catch (error) {
    console.error('Error finding item by id:', error);
    throw error;
  }
}

exports.create = async (data) => {
  try {
    const pool = await getPool();
    
    // Try calling stored procedure if available
    try {
      const result = await pool.request()
        .input('name', sql.NVarChar, data.name)
        .input('description', sql.NVarChar, data.description)
        .execute('create_item');
      return { insertId: result.returnValue };
    } catch (procError) {
      // Fallback to regular INSERT if procedure doesn't exist
      const result = await pool.request()
        .input('name', sql.NVarChar, data.name)
        .input('description', sql.NVarChar, data.description)
        .query(`
          INSERT INTO items (name, description) 
          VALUES (@name, @description);
          SELECT SCOPE_IDENTITY() as insertId;
        `);
      return { insertId: result.recordset[0].insertId };
    }
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
}

exports.score = async (id) => {
  try {
    const pool = await getPool();
    
    // Try calling stored procedure if available
    try {
      const result = await pool.request()
        .input('id', sql.Int, id)
        .execute('calculate_score');
      return { score: result.recordset[0]?.score || 0 };
    } catch (procError) {
      // Fallback: return dummy score
      return { score: 0 };
    }
  } catch (error) {
    console.error('Error calculating score:', error);
    return { score: 0 };
  }
}
