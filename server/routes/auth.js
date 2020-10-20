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
  passport.authenticate('google', {failureRedirect: `${config.get('base_url')}/login`}),
  async (req, res) => {
    res.redirect(`${config.get('base_url')}`)
  }
)

// /auth/+logout
router.get('/logout', async (req, res) => {
  req.logout()
  res.redirect(`${config.get('base_url')}`)
})

module.exports = router
