const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose
db.user = require('./userSchema')
db.Roles = ['admin']

module.exports = db
