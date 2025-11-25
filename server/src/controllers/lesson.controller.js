const service = require('../services/lesson.service')

exports.list = async (req, res, next) => {
  try {
    const { courseId } = req.query
    if (!courseId) return res.status(400).json({ error: 'courseId required' })
    const lessons = await service.findByCourse(courseId)
    res.json(lessons)
  } catch (err) { next(err) }
}

exports.create = async (req, res, next) => {
  try {
    const { courseId } = req.params
    const r = await service.create(courseId, req.body)
    res.status(201).json(r)
  } catch (err) { next(err) }
}

module.exports = exports
