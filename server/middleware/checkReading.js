const Meter = require('../models/Meter')

module.exports = (req, res, next) => {
  const {id, time, delta, value} = req.query

  if (!isReadingCorrect(id, time, delta, value))
  {
    res.status(400).json('Wrong reading data')
    console.log('Wrong reading data', req.query)
  }

  Meter.findOne({id}, (error, meter) => {
    if (error)
      res.status(500).json('DB error!')

    if (meter === null)
    {
      res.status(400).json('Unregistered meter Id')
      console.log('Unregistered meter Id', req.query)
    }

    // test!!!
    req.meter = meter
    req.reading = {id, time, delta, value}
    console.log('Meter founded:', meter)
    console.log('Reading is correct:', req.reading)
    // ---

    next()
  })
}

const isReadingCorrect = (id, time, delta, value) => {
  return id.length === 8 && id[0] === 'I' && time.length === 10 && delta && value
}
