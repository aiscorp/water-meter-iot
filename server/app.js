const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const cookieParser = require('cookie-parser')
// ----

// Express
const app = express()

// Middleware Sessions
app.use(
  session({
    secret: 'cats',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: require('mongoose').connection }),
  })
)
// Middleware Auth by Passport.Js
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

// Middleware
app.use(express.json())

// Routes
app.use('/auth', require('./routes/auth'))
app.use('/api/readings', require('./routes/readings'))
app.use('/api/get-meters', require('./routes/get-meters'))
app.use('/api/get-readings', require('./routes/get-readings'))

// Middleware for production
if (process.env.NODE_ENV === 'production') {

}


const PORT = config.get('port')

async function start() {
  try {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.connect(config.get('mongoUri'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
    }

    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
