const {Router} = require('express')
const config = require('config')
const auth = require('../middleware/auth.middleware')
const router = Router()

let counter = {
  hot: 0,
  cold: 0
}

router.get('/', auth, async (req, res) => {
  try {
    const {time, type, value, current} = req.query
    let date = new Date(Number(time) * 1000)
    res.status(200).json({response: 'Data is collected'})

    console.log(`Time:${date} Meter type:${type} Delta: ${value}m3 Current value:${current}m3`)
  } catch (e) {
    res.status(500).json({message: 'Server error'})
  }
})

module.exports = router
