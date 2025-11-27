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

// Create poolPromise for modern usage
const poolPromise = sql.connect(config);

async function getPool() {
  const pool = await sql.connect(config);
  return pool;
}

// Export function connectDB để tương thích với server.js
async function connectDB() {
  try {
    await getPool();
    console.log('SQL Server connected successfully!');
    return true;
  } catch (error) {
    console.error('SQL Server connection error:', error);
    throw error;
  }
}

module.exports = connectDB;
module.exports.poolPromise = poolPromise;
