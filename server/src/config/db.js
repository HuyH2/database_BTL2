/**
 * db.js
 * Database helper that supports both MySQL and MSSQL.
 * Exports: query(sql, params), callProcedure(name, params), connectDB()
 */
const { DB_CLIENT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env

if (DB_CLIENT === 'mssql') {
  const mssql = require('mssql')
  const config = {
    user: DB_USER || 'sa',
    password: DB_PASSWORD || '',
    server: DB_HOST || 'localhost',
    port: DB_PORT ? Number(DB_PORT) : 1433,
    database: DB_NAME || '',
    options: { enableArithAbort: true, trustServerCertificate: true }
  }

  const convertPlaceholders = (sql, params) => {
    // Replace first `?` with `@p0`, second with `@p1`, etc.
    if (!params || params.length === 0) return sql
    let outSql = sql
    for (let i = 0; i < params.length; i++) {
      outSql = outSql.replace('?', `@p${i}`)
    }
    return outSql
  }

  module.exports = {
    client: 'mssql',
    sql: mssql,
    query: async (sql, params = []) => {
      const pool = await mssql.connect(config)
      try {
        const request = pool.request()
        params.forEach((p, i) => request.input(`p${i}`, p))
        const finalSql = convertPlaceholders(sql, params)
        const result = await request.query(finalSql)
        return result.recordset
      } finally {
        await pool.close()
      }
    },
    raw: async (sql, params = []) => {
      // returns the entire result object for non-select queries
      const pool = await mssql.connect(config)
      try {
        const request = pool.request()
        params.forEach((p, i) => request.input(`p${i}`, p))
        const finalSql = convertPlaceholders(sql, params)
        const result = await request.query(finalSql)
        return result
      } finally { await pool.close() }
    },
    callProcedure: async (name, params = []) => {
      const pool = await mssql.connect(config)
      try {
        const request = pool.request()
        params.forEach((p, i) => request.input(`p${i}`, p))
        const result = await request.execute(name)
        return result.recordset
      } finally { await pool.close() }
    },
    connectDB: async () => {
      const pool = await mssql.connect(config)
      await pool.close()
      return true
    }
  }
} else {
  const mysql = require('mysql2/promise')
  const pool = mysql.createPool({ host: DB_HOST || 'localhost', port: DB_PORT ? Number(DB_PORT) : 3306, user: DB_USER || 'root', password: DB_PASSWORD || '', database: DB_NAME || '', waitForConnections: true, connectionLimit: 10 })
  module.exports = {
    client: 'mysql',
    query: async (sql, params = []) => {
      const [rows] = await pool.execute(sql, params)
      return rows
    },
    raw: async (sql, params = []) => {
      // returns the full result object (rows, fields) for non-select queries
      const result = await pool.execute(sql, params)
      return result
    },
    callProcedure: async (name, params = []) => {
      const placeholders = params.map(() => '?').join(',')
      const sql = `CALL ${name}(${placeholders})`
      const [rows] = await pool.query(sql, params)
      return rows
    },
    connectDB: async () => {
      const conn = await pool.getConnection()
      conn.release()
      return true
    }
  }
}
// End of db.js; exports are set above according to DB_CLIENT
