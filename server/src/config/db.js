const { DB_CLIENT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env
if (DB_CLIENT === 'mssql') {
  const mssql = require('mssql')
  const config = { user: DB_USER, password: DB_PASSWORD, server: DB_HOST, port: DB_PORT ? Number(DB_PORT) : 1433, database: DB_NAME, options: { enableArithAbort: true, trustServerCertificate: true } }
  module.exports = {
    query: async (sql, params=[]) => {
      const pool = await mssql.connect(config)
      const result = await pool.request().query(sql)
      await pool.close()
      return result.recordset
    }
  }
} else {
  const mysql = require('mysql2/promise')
  const pool = mysql.createPool({ host: DB_HOST || 'localhost', port: DB_PORT ? Number(DB_PORT) : 3306, user: DB_USER || 'root', password: DB_PASSWORD || '', database: DB_NAME || '', waitForConnections: true, connectionLimit: 10 })
  module.exports = {
    query: async (sql, params=[]) => {
      const [rows] = await pool.execute(sql, params)
      return rows
    },
    callProcedure: async (name, params=[]) => {
      const placeholders = params.map(()=> '?').join(',')
      const sql = `CALL ${name}(${placeholders})`
      const [rows] = await pool.query(sql, params)
      return rows
    }
  }
}
