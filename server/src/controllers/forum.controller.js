const service = require('../services/forum.service')

exports.list = async (req, res, next) => {
  try {
    const { courseId } = req.query
    if (!courseId) return res.status(400).json({ error: 'courseId required' })
    const items = await service.findByCourse(courseId)
    res.json(items)
  } catch (err) { next(err) }
}

exports.detail = async (req, res, next) => {
  try { const f = await service.findById(req.params.id); if (!f) return res.status(404).json({ error: 'Not found' }); res.json(f) } catch (err) { next(err) }
}

exports.getPosts = async (req, res, next) => {
  try { const posts = await service.getPosts(req.params.id); res.json(posts) } catch (err) { next(err) }
}

exports.createPost = async (req, res, next) => {
  try { const r = await service.createPost(req.params.id, req.body); res.status(201).json(r) } catch (err) { next(err) }
}

module.exports = exports
