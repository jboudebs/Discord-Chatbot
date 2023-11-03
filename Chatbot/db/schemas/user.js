const mongoose = require('mongoose');

user = { "login": String, "all_info" : Object}

const schema  = mongoose.Schema(user)

module.exports = mongoose.model('user', schema);