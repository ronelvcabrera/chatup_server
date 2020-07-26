const express = require('express');
const router = express.Router();

const config = require('../../config')
const UserService = require('../../services/UserService')


router.route('/')
	.post(async (req, res, next) => {
		/**
		 * Register endpoint
		 */
		const userName = req.body.username
		const password = req.body.password
		try {
			UserService.registerUser(userName, password)
			res.status(200).json({ 
				success: 1,
				data: {
					message: 'Successfully created user'
				}
			})
		} catch (err) {
			const statusCode = err.statusCode ? err.statusCode:500
			res.status(statusCode).json({ 
				success: 0,
				err: err.message
			})
		}
	})

module.exports = router;