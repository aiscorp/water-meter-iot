const Meter = require('../models/Meter')

module.exports = (req, res, next) => {
  const {id} = req.query

  if (!isId(id))
  {
    res.status(400).json('Wrong meter Id')
    console.log('Wrong meter Id', req.query)
  }


  Meter.findById(id, (error, meter) => {
    if (error)
      res.status(500).json('DB error!')

    if (meter === null)
    {
      res.status(400).json('Unregistered meter Id')
      console.log('Unregistered meter Id', req.query)
    }

    next()
  })
}

const isId = (id) => {
  return id.length === 8 && id[0] === 'I' ? true : false
}
