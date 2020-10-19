const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  id: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  displayName: {type: String, required: true},
  photo: {type: String, required: true},
  accessToken: {type: String, required: true},
  refreshToken: {type: String, required: true},
  meters: [{type: Types.ObjectId, ref: 'Meter'}]
})

module.exports = model('User', schema)
