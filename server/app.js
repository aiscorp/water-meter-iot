const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
// ----
const Meter = require('./models/Meter')
const Reading = require('./models/Reading')
const User = require('./models/User')
// ----
const https = require('https')
const fs = require('fs')
const options = {
  key: fs.readFileSync('./config/localhost-key.pem'),
  cert: fs.readFileSync('./config/localhost.pem')
}

// Express
const app = express()

// Middleware Sessions
app.use(session({
    secret: 'cats',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: require('mongoose').connection})
  })
)
// Middleware Auth by Passport.Js
app.use(bodyParser.urlencoded({extended: false}))
app.use(passport.initialize())
app.use(passport.session())
// Middleware
// app.use(express.json())

// Routes
app.use('/auth', require('./routes/auth'))
app.use('/api', require('./routes/api'))

// Middleware for production
if (process.env.NODE_ENV === 'production') {

}

const PORT = config.get('port')

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    // const meter1$ = new Meter(
    //   { id: 'I0000001', type: 'Cold water meter', value: 105 })
    // const meter2$ = new Meter(
    //   { id: 'I0000002', type: 'Hot water meter', value: 95 })
    // await meter1$.save()
    // await meter2$.save()
    //
    //
    // const reading1$ = new Reading(
    //   {id: '000001', time: '1654789000', delta: 0.1, value: 0.1, meter: meter1$})
    // const reading2$ = new Reading(
    //   {id: '000002', time: '1654789000', delta: 0.1, value: 0.2, meter: meter1$})
    // const reading3$ = new Reading(
    //   {id: '000003', time: '1654789000', delta: 0.2, value: 0.4, meter: meter1$})
    // const reading4$ = new Reading(
    //   {id: '000004', time: '1654789000', delta: 0.3, value: 0.3, meter: meter2$})
    //
    //
    // await reading1$.save()
    // await reading2$.save()
    // await reading3$.save()
    // await reading4$.save()

    https.createServer(options, app)
      .listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    // app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
