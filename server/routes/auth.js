const {Router} = require('express')
const router = Router()
const passport = require('passport')
const config = require('config')

require('../auth.strategies/google.strategy')

// /auth/+google
router.get(
  '/google',
  passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']}),
  async (req, res) => {}
)

// /auth/+google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', {failureRedirect: `${config.get('baseUrl')}/login`}),
  async (req, res) => {
    res.redirect(`${config.get('frontUrl')}`)
  }
)

// /auth/+logout
router.get('/logout', async (req, res) => {
  req.logOut()
  req.session.destroy(function (err) {
    if (!err) {
      res.status(200)
        .clearCookie('connect.sid', {path: '/'})
        .send({status: 'Success'})
    }
  })
  res.redirect(`${config.get('frontUrl')}`)
})

module.exports = router
