
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const GenericException = require('../utils/GenericException')

module.exports = {
	registerUser: async (username, password) => {
		/**
		 * Uploading file and adding to database
		 */
		let newUser = new User({
			username,
			password
		})
		try {
			await newUser.save()
		} catch (err) {
			throw new GenericException(500, 'Error Occurred: Unable to create user')
		}
	},
	getUserInfo: async(username) => {
		const users = await User.find({ username }, 'username').exec()
		if (!users.length) {
			return null
		}
		return users[0].username
	},
	matchLogin: async (username, password) => {
		const users = await User.find({ username, password }).exec()
		return users.length > 0
	}
}
