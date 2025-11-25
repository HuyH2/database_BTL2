const db = require('../config/db')

exports.findAll = async () => {
  return await db.query('SELECT * FROM ORGANIZATION')
}

exports.findById = async (id) => {
  const rows = await db.query('SELECT * FROM ORGANIZATION WHERE OrganizationID = ?', [id])
  return rows[0] || null
}

exports.create = async (data) => {
  if (!data.Name) throw new Error('Name required')
  if (db.client === 'mysql') {
    const [res] = await db.raw('INSERT INTO ORGANIZATION (Name, Address, Phone, Email, TaxID, Website) VALUES (?, ?, ?, ?, ?, ?)', [data.Name, data.Address || null, data.Phone || null, data.Email || null, data.TaxID || null, data.Website || null])
    return { insertId: res.insertId }
  }
  const rows = await db.query('INSERT INTO ORGANIZATION (Name, Address, Phone, Email, TaxID, Website) VALUES (?, ?, ?, ?, ?, ?); SELECT SCOPE_IDENTITY() as OrganizationID', [data.Name, data.Address || null, data.Phone || null, data.Email || null, data.TaxID || null, data.Website || null])
  return { insertId: rows && rows[0] && rows[0].OrganizationID }
}

exports.update = async (id, data) => {
  const fields = []
  const params = []
  const add = (k, v) => { fields.push(`${k}=?`); params.push(v) }
  if (data.Name !== undefined) add('Name', data.Name)
  if (data.Address !== undefined) add('Address', data.Address)
  if (data.Phone !== undefined) add('Phone', data.Phone)
  if (data.Email !== undefined) add('Email', data.Email)
  if (data.TaxID !== undefined) add('TaxID', data.TaxID)
  if (data.Website !== undefined) add('Website', data.Website)
  if (fields.length === 0) return await exports.findById(id)
  const sql = `UPDATE ORGANIZATION SET ${fields.join(', ')} WHERE OrganizationID = ?`
  await db.raw(sql, [...params, id])
  return await exports.findById(id)
}

exports.delete = async (id) => {
  await db.raw('DELETE FROM ORGANIZATION WHERE OrganizationID = ?', [id])
  return { ok: true }
}
