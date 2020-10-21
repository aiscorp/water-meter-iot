const User = require('../models/User')

module.exports = (req, res, next) => {
  if (!req.user)
    return res.status(401).send('Not authorized!')

  const {id} = req.user
  console.log('id:', id)

  User.findOne({id}, (error, user) => {
    if (error)
      return res.status(500).send('DB error!')

    if (user === null)
      return res.status(401).send('Not authorized!')

    console.log('user:', user)
    next()
  })
}

// module.exports = (req, res, next) => {
//   User.findById(req.user.id).exec(function (error, user) {
//     if (error) {
//       return next(error)
//     } else {
//       if (user === null) {
//         let err = new Error('Not authorized! Go back!')
//         err.status = 400
//         return next(err)
//       } else {
//         return next()
//       }
//     }
//   })
// }
