const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'Honghuy123',      // mật khẩu bạn dùng khi run container
  server: '127.0.0.1',         // SQL Server trong Docker
  port: 1433,
  database: 'BTL2',
  options: {
    encrypt: false,            // local thì để false
    trustServerCertificate: true
  }
};

let pool = null;

async function getPool() {
  try {
    if (!pool) {
      pool = await sql.connect(config);
      console.log('SQL Server pool connected successfully!');
    }
    return pool;
  } catch (error) {
    console.error('SQL Server connection error:', error);
    throw error;
  }
}

module.exports = { sql, getPool };