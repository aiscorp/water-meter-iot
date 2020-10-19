const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  id: {type: String, required: true, unique: true},
  type: {type: String, required: true},
  name: {type: String},
  value: {type: Number, required: true},
  readings: [{type: Types.ObjectId, ref: 'Reading'}]
})

module.exports = model('Meter', schema)
