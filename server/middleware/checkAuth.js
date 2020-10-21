const User = require('../models/User')

module.exports = (req, res, next) => {
  const {id} = req.user
  User.findOne({id}, (error, user) => {
    if (error)
      res.status(500).json('DB error!')

    if (user === null)
      res.status(401).json('Not authorized!')

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
