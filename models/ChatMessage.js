const mongoose = require('mongoose')

const ChatMessageScheme = mongoose.Schema({
	chatMessage: {
		type: String
	},
	chatMessage: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	},
	user: {
		type: String
	},
	messageType: {
		type: String
	}
})

module.exports = mongoose.model('ChatMessage', ChatMessageScheme)