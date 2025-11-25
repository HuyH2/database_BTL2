const service = require('../services/organization.service')

exports.list = async (req, res, next) => {
  try {
    const orgs = await service.findAll()
    res.json(orgs)
  } catch (err) { next(err) }
}

exports.detail = async (req, res, next) => {
  try { const org = await service.findById(req.params.id); if (!org) return res.status(404).json({ error: 'Not found' }); res.json(org) } catch (err) { next(err) }
}

exports.create = async (req, res, next) => {
  try { const r = await service.create(req.body); res.status(201).json(r) } catch (err) { next(err) }
}

exports.update = async (req, res, next) => {
  try { const r = await service.update(req.params.id, req.body); res.json(r) } catch (err) { next(err) }
}

exports.delete = async (req, res, next) => {
  try { await service.delete(req.params.id); res.json({ ok: true }) } catch (err) { next(err) }
}

module.exports = exports
