const User = require('../models/User')

module.exports = (req, res, next) => {
  if (!req.user){
    return res.status(401).send('Not authorized!')
  }

  const {id} = req.user
  console.log('id:', id)

  User.findOne({id}, (error, user) => {
    if (error)
      return res.status(500).send('DB error!')

    if (user === null)
      return res.status(401).send('Not authorized! User founded')

    console.log('user:', user)
    next()
  })
}
