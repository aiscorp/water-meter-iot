const config = require('config')
const passport = require('passport')
const User = require('../models/User')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: config.get('client_id'),
      clientSecret: config.get('client_secret'),
      callbackURL: `${config.get('base_url')}/auth/google/callback`
    },
    function (accessToken, refreshToken, params, profile, done) {
      const user = new User({
        id: profile.id,
        displayName: profile.name,
        photo: profile.photos[0].value,
        email: profile.email,
        accessToken,
        refreshToken
      })
      User.findOne({id: profile.id}, (err, obj) => {
        if (!err) {
          if (obj) {
            obj.accessToken = accessToken
            obj.save()
          } else {
            user.save()
          }
          return done(null, user, {message: 'Пользователь найден'})
        } else {
          return done(null, false)
        }
      })
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

// passport.serializeUser(function (user, done) {
//   done(null, user.id)
// })
//
// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user)
//   })
// })
