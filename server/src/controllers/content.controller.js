const service = require('../services/content.service')

exports.list = async (req, res, next) => {
  try {
    const lessonId = req.query.lessonId
    if (!lessonId) return res.status(400).json({ error: 'lessonId required' })
    const items = await service.findByLesson(lessonId)
    res.json(items)
  } catch (err) { next(err) }
}

exports.detail = async (req, res, next) => {
  try { const item = await service.findById(req.params.id); if (!item) return res.status(404).json({ error: 'Not found' }); res.json(item) } catch (err) { next(err) }
}

module.exports = exports
