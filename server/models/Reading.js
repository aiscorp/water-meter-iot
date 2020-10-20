const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  id: {type: String, required: true},
  time: {type: Date, required: true},
  delta: {type: Number, required: true},
  value: {type: Number, required: true}
})

module.exports = model('Reading', schema)
