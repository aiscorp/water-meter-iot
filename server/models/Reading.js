const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  meterId: {type: String, required: true},
  time: {type: Date, required: true},
  delta: {type: Number, required: true},
  value: {type: Number, required: true},
  type: {type: String}
})

module.exports = model('Reading', schema)
