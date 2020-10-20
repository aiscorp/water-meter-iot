const {Router} = require('express')
const config = require('config')
const checkAuth = require('../middleware/checkAuth')
const checkReading = require('../middleware/checkReading')
const checkMeter = require('../middleware/checkMeter')
const router = Router()
const Meter = require('../models/Meter')
const Reading = require('../models/Reading')
const User = require('../models/User')

const getState = (user) => ({
  authState: true,
  id: user.id,
  email: user.email,
  displayName: user.displayName,
  photo: user.photo
})


// /api/+user
router.get('/user', checkAuth, async (req, res) => {
  try {
    console.log('User:', getState(req.user))

    res.status(200).send(getState(req.user))
  } catch (e) {
    res.status(500).json({message: 'Server error'})
  }
})

// /api/+meters
router.get('/meters', checkAuth, async (req, res) => {
  try {
    const meters$ = User.findOne({id: req.user.id}).meters

    console.log('Meters:', meters$)

    res.status(200).send(meters$)
  } catch (e) {
    res.status(500).json({message: 'Server error'})
  }
})

// /api/+readings:id
router.get('/readings:id', checkAuth, async (req, res) => {
  try {
    const {id} = req.query
    const readings$ = Meter.findOne({id}).readings

    console.log('Readings by meter Id:', id)
    console.log(readings$)

    res.status(200).send(readings$)
  } catch (e) {
    res.status(500).json({message: 'Server error'})
  }
})

// /api/+readings {id, time, delta, value}
router.get('/reading', checkReading, async (req, res) => {
  try {
    const {reading, meter} = req

    const meter$ = await Meter.findOne({id: meter.id})
    const reading$ = new Reading({...reading})

    meter$.readings.push(reading$.objectId)

    await reading$.save()
    await meter$.update()

    console.log(`Time:${new Date(Number(reading.time) * 1000)} Meter:${meter.type} Delta: ${reading.delta}m3 Current value:${reading.value}m3`)

    res.status(200).json({response: 'Data is collected'})
  } catch (e) {
    res.status(500).json({message: 'Server error'})
  }
})

// /api/+init {id, type}
router.get('/init', checkMeter, async (req, res) => {
  try {
    const {meter} = req

    if (meter.unregistered) {
      const meter$ = new Meter({...meter, value: 0, readings: []})
      await meter$.save()

      res.status(201).send({response: 'New meter is added', value: 0})

    } else {
      res.status(200).send({response: 'Last reading is sent', value: meter.value})
    }

  } catch (e) {
    res.status(500).json({message: 'Server error'})
  }
})

module.exports = router
