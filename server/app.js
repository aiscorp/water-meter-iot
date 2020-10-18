const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
// ----

// Express
const app = express()

// Middleware
app.use(express.json())
app.use('/api/readings', require('./routes/readings'))
//app.use(express.json({ extended: true }))
//app.use(bodyParser.urlencoded({ extended: false }))

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
