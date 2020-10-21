const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  id: {type: String, required: true, unique: true},
  displayName: {type: String, required: true},
  photo: {type: String},
  email: {type: String},
  accessToken: {type: String, required: true}
})

module.exports = model('User', schema)
