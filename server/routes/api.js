const {Router} = require('express')
const config = require('config')
const isUserAuth = require('../middleware/userAuth.middleware')
const isMeterExist = require('../middleware/meterExist.middleware')
const router = Router()

const getState = (user) => ({
  authState: true,
  id: user.id,
  email: user.email,
  displayName: user.displayName,
  photo: user.photo
})


// /api/+user
router.get('/user', isUserAuth, async (req, res) => {
  res.send(getState(req.user))
})

// /api/+meters
router.get('/meters', isUserAuth, async (req, res) => {

})

// /api/+records
router.get('/records', isUserAuth, async (req, res) => {

})

// /api/+readings
router.get('/readings', isMeterExist, async (req, res) => {
  try {
    const {time, type, value, current} = req.query
    let date = new Date(Number(time) * 1000)
    res.status(200).json({response: 'Data is collected'})

    console.log(`Time:${date} Meter type:${type} Delta: ${value}m3 Current value:${current}m3`)
  } catch (e) {
    res.status(500).json({message: 'Server error'})
  }
})

// /api/+init
router.get('/init', async (req, res) => {
  try {


  } catch (e) {
    res.status(500).json({message: 'Server error'})
  }
})



module.exports = router
