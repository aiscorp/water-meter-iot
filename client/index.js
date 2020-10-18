const express = require('express')
const bodyParser = require('body-parser')
//const config = require('config')
const firebase = require('firebase')


/*const firedb = firebase({
    apiKey: '<your-api-key>',
    authDomain: '<your-auth-domain>',
    databaseURL: '<your-database-url>',
    projectId: '<your-cloud-firestore-project>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-sender-id>'
  })*/

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

const port = 80

var counter = {
    hot:0,
    cold:0
}

app.get('/api/get', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/readings',(req,res)=>{
    date  = new Date(Number(req.query.time)*1000)
    console.log(`время:${date} Тип водоснабжения:${req.query.type} Дельта: ${req.query.value} Текущие показания:${req.query.current}`)
    res.status(200).json({Data:'sdfsdf'})
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})