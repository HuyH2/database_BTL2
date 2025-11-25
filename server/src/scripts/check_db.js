require('dotenv').config()
const db = require('../config/db')

(async () => {
  try {
    const rows = await db.query('SELECT 1 AS ok')
    console.log('DB check OK. Result:', rows)
    process.exit(0)
  } catch (err) {
    console.error('DB check failed:', err && err.message ? err.message : err)
    process.exit(1)
  }
})()
