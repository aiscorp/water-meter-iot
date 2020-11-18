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
    res.status(200).send(getState(req.user))
  } catch (e) {
    res.status(500).json({message: 'Server error'})
  }
})

// /api/+meters   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Wrong!!!!!
router.get('/meters', checkAuth, async (req, res) => {
  try {
    const {id} = req.user
    const meters$ = User.findOne({id}).meters

    console.log('Meters:', meters$)

    res.status(200).send(meters$)
  } catch (e) {
    res.status(500).json({message: 'Server error'})
  }
})

// /api/+test/meters     !tested!
router.get('/test/meters', async (req, res) => {
  try {
    const meters$ = await Meter.find()

    res.status(200).send(meters$)
  } catch (e) {
    res.status(500).json({message: 'Server error'})
  }
})

// /api/+readings?id=[10lettersId]     !tested!
router.get('/readings', async (req, res) => {
  try {
    const {id} = req.query
    const meter$ = await Meter.findOne({id})
    const readings$ = await Reading.find({meter: meter$})

    res.status(200).send(readings$)
  } catch (e) {
    res.status(500).json({message: 'Server error'})
  }
})

// /api/+test/readings     !tested!
router.get('/test/readings', async (req, res) => {
  try {
    const readings$ = await Reading.find()

    res.status(200).send(readings$)
  } catch (e) {
    res.status(500).json({message: 'Server error'})
  }
})

// /api/+readings {id, time, delta, value}     !tested!
router.get('/reading', checkReading, async (req, res) => {
  try {
    const {reading, meter} = req

    const meter$ = await Meter.findOne({id: meter.id})
    const reading$ = new Reading({...reading, meter: meter$})

    meter$.value -= -reading.delta


    await reading$.save()
    await meter$.updateOne({value: meter$.value})

    console.log(`Time:${new Date(Number(reading.time) * 1000)} Meter:${meter.type} Delta: ${reading.delta}m3 Current value:${reading.value}m3`)

    res.status(200).json({response: 'Data is collected'})
  } catch (e) {
    res.status(500).json({message: 'Server error'})
  }
})

// /api/+init {id, type}     !tested!
router.get('/init', checkMeter, async (req, res) => {
  try {
    const {meter} = req

    if (meter.unregistered) {
      const meter$ = new Meter({...meter, value: 0})
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
