const service = require('../services/items.service')

exports.list = async (req,res,next)=>{
  try{
    const items = await service.findAll(req.query)
    res.json(items)
  }catch(err){next(err)}
}

exports.search = async (req,res,next)=>{
  try{ const items = await service.search(req.query); res.json(items) }catch(err){next(err)}
}

exports.detail = async (req,res,next)=>{
  try{ const item = await service.findById(req.params.id); if(!item) return res.status(404).json({error:'Not found'}); res.json(item) }catch(err){next(err)}
}

exports.create = async (req,res,next)=>{
  try{ const result = await service.create(req.body); res.status(201).json(result) }catch(err){next(err)}
}

exports.score = async (req,res,next)=>{
  try{ const result = await service.score(req.params.id); res.json(result) }catch(err){next(err)}
}
