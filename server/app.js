const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
// ----
const Meter = require('./models/Meter')
const Reading = require('./models/Reading')
const User = require('./models/User')
// ----
const https = require('https')
const fs = require('fs')

let options
if (process.env.NODE_ENV === 'development') {
  options = {
    key: fs.readFileSync('./config/localhost-key.pem'),
    cert: fs.readFileSync('./config/localhost.pem')
  }
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

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  //res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

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


    https.createServer(options, app)
      .listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    //
    // app.listen(Number(PORT + 1), () => console.log(`App has been started on port ${PORT+1}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
