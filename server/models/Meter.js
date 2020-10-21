const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  id: {type: String, required: true, unique: true},
  type: {type: String, required: true},
  description: {type: String},
  value: {type: Number, required: true},
  user: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Meter', schema)
