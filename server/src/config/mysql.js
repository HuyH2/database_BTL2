const sql = require('mssql');

const sqlConfig = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'BTL2',
  server: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // Set to true if using Azure
    trustServerCertificate: true // For local development
  }
};

let pool;

const getPool = async () => {
  try {
    if (!pool) {
      pool = await sql.connect(sqlConfig);
      console.log('SQL Server connected successfully!');
    }
    return pool;
  } catch (error) {
    console.error('SQL Server connection error:', error);
    throw error;
  }
};

const connectSQLServer = async () => {
  try {
    await getPool();
    return pool;
  } catch (error) {
    console.error('SQL Server connection error:', error);
    throw error;
  }
};

module.exports = { connectSQLServer, getPool, sql };