const fs = require('fs').promises
const path = require('path')
const db = require('../config/db')

const SQL_FILES = [
  '01_create_tables.sql',
  '02_insert_tables.sql',
  '03_triggers.sql',
  '04_stored_procedure.sql',
  '05_functions.sql',
  '06_test.sql'
]

const readSqlFile = async (filename) => {
  const fullPath = path.resolve(__dirname, '../../../', filename)
  const content = await fs.readFile(fullPath, 'utf8')
  return content
}

// naive split by semicolon; skips empty lines
const splitStatements = (sql) => sql
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('/*'))

exports.init = async (req, res, next) => {
  try {
    for (const f of SQL_FILES) {
      const content = await readSqlFile(f)
      const statements = splitStatements(content)
      for (const stmt of statements) {
        try {
          // For DDL and DML, run raw
          await db.raw(stmt, [])
        } catch (err) {
          // continue, but log
          console.warn(`Failed running statement from ${f}:`, err.message || err)
        }
      }
    }
    res.json({ ok: true, message: 'DB scripts executed (see logs for details)' })
  } catch (err) {
    next(err)
  }
}

// Run a quick health check: SELECT 1 as ok
exports.check = async (req, res, next) => {
  try {
    const rows = await db.query('SELECT 1 AS ok')
    return res.json({ ok: true, rows })
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message || String(err) })
  }
}

// Clear data from tables in a safe order. Requires ?confirm=true to execute.
exports.clear = async (req, res, next) => {
  try {
    const confirm = (req.query.confirm || req.body.confirm) === 'true' || req.body.confirm === true
    if (!confirm) return res.status(400).json({ ok: false, message: 'Must provide confirm=true to clear DB' })

    // Safe order: children first
    const tables = [
      'USER_FORUM_MOD', 'USER_FORUM_JOIN', 'DOCUMENT_DOWNLOAD', 'QUIZ_RESULT', 'STUDENT_COURSE', 'STUDENT_GUARDIAN',
      'ADMIN_SUPERVISE', 'USER_ORGANIZATION', 'POST', 'FORUM', 'CERTIFICATE', 'VIDEO', 'QUIZ', 'DOCUMENT', 'CONTENT_ITEM',
      'LESSON', 'COURSE', 'GUARDIAN', 'STUDENT', 'INSTRUCTOR', 'ADMIN', 'SSO', 'USER_ACCOUNT', 'ORGANIZATION'
    ]

    for (const t of tables) {
      try {
        // Use raw to get driver-specific result
        if (db.client === 'mysql') {
          await db.raw(`DELETE FROM ${t}`)
          await db.raw(`ALTER TABLE ${t} AUTO_INCREMENT = 1`)
        } else {
          await db.raw(`DELETE FROM ${t}`)
          await db.raw(`IF OBJECT_ID('${t}') IS NOT NULL DBCC CHECKIDENT ('${t}', RESEED, 0)`)
        }
      } catch (err) {
        // ignore errors for tables that might not exist yet
        console.warn('clear table err', t, err.message || String(err))
      }
    }

    return res.json({ ok: true, message: 'Clear finished' })
  } catch (err) {
    next(err)
  }
}

exports.reset = async (req, res, next) => {
  try {
    const confirm = req.query.confirm === 'true' || req.body?.confirm === true
    if (!confirm) return res.status(400).json({ ok: false, message: 'Pass ?confirm=true or { confirm: true } in body to confirm reset.' })

    if (db.client === 'mysql') {
      // disable fk checks
      await db.raw('SET FOREIGN_KEY_CHECKS = 0')
      const rows = await db.query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_TYPE = 'BASE TABLE'")
      const tbls = rows.map(r => r.TABLE_NAME)
      for (const t of tbls) {
        try {
          if (t.toLowerCase().includes('schema') || t.toLowerCase().includes('migrations')) continue
          await db.raw(`TRUNCATE TABLE \`${t}\``)
          await db.raw(`ALTER TABLE \`${t}\` AUTO_INCREMENT = 1`)
        } catch (err) {
          console.warn('Failed to truncate', t, err.message || err)
        }
      }
      await db.raw('SET FOREIGN_KEY_CHECKS = 1')
      return res.json({ ok: true, message: 'MySQL: all tables truncated (best-effort).' })
    }

    // MSSQL path
    const qs = await db.query("SELECT TABLE_SCHEMA, TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_CATALOG = DB_NAME() AND TABLE_SCHEMA NOT IN ('sys','INFORMATION_SCHEMA')")
    const tables = qs.map(r => ({ schema: r.TABLE_SCHEMA, name: r.TABLE_NAME }))
    // disable foreign keys and delete rows
    for (const t of tables) {
      const full = `[${t.schema}].[${t.name}]`
      try {
        await db.raw(`ALTER TABLE ${full} NOCHECK CONSTRAINT ALL`)
      } catch (err) {
        // ignore
      }
    }
    for (const t of tables) {
      const full = `[${t.schema}].[${t.name}]`
      try {
        // prefer TRUNCATE, fallback to DELETE
        try { await db.raw(`TRUNCATE TABLE ${full}`) } catch (err) { await db.raw(`DELETE FROM ${full}`) }
      } catch (err) {
        console.warn('Failed to clear', full, err.message || err)
      }
    }
    // reseed identities
    for (const t of tables) {
      const full = `[${t.schema}].[${t.name}]`
      try {
        await db.raw(`DBCC CHECKIDENT('${t.schema}.${t.name}', RESEED, 0)`)
      } catch (err) {
        // ignore
      }
    }
    for (const t of tables) {
      const full = `[${t.schema}].[${t.name}]`
      try {
        await db.raw(`ALTER TABLE ${full} CHECK CONSTRAINT ALL`)
      } catch (err) {
        // ignore
      }
    }
    return res.json({ ok: true, message: 'MSSQL: all base tables truncated/deleted and reseeded (best-effort).' })
  } catch (err) { next(err) }
}

module.exports = { init: exports.init, check: exports.check, clear: exports.clear, reset: exports.reset }
