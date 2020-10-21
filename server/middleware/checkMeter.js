const Meter = require('../models/Meter')

module.exports = (req, res, next) => {
  const {id, type} = req.query

  if (!isMeterCorrect(id, type)) {
    res.status(400).json('Wrong reading data')
    console.log('Wrong reading data', req.query)
  }

  Meter.findOne({id}, (error, meter) => {
    if (error)
      res.status(500).json('DB error!')

    if (meter === null) {
      req.meter = {id, type, unregistered: true}
      console.log('Unregistered meter Id:', id)
      return next()
    }

    // test!!!
    req.meter = meter
    console.log('Meter founded:', meter.toJSON())
    // ---

    next()
  })
}

const isMeterCorrect = (id, type) => {
  return id.length === 8 && id[0] === 'I' && type.length > 0
}
