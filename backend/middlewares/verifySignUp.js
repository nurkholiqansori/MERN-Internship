const db = require('../schema/index')
const User = db.user

const checkDuplicateUser = (req, res, next) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      return res.status(500).json({
        error: err,
      })
    }
    if (user) {
      return res.status(400).json({
        message: 'Username already exists',
      })
    }
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        return res.status(500).json({
          error: err,
        })
      }
      if (user) {
        return res.status(400).json({
          message: 'Email already exists',
        })
      }
      next()
    })
  })
}

module.exports = {
  checkDuplicateUser}
