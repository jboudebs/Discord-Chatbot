const mongoose = require('mongoose');

bot = { "token" : String,
		"name" : String,
		"brainPath" : String,
		"status" : {type : Boolean, default : false},
		"user" : Object
	}

const schema  = mongoose.Schema(bot)

module.exports = mongoose.model('bot', schema);