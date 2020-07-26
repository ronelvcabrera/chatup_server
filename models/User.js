const mongoose = require('mongoose')

const UserScheme = mongoose.Schema({
	username: {
		type: String
	},
	password: {
		type: String
	}
})

module.exports = mongoose.model('User', UserScheme)