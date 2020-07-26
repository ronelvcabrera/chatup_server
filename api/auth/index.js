const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const { secret } = require('../../config')
const UserService = require('../../services/UserService')


router.route('/login')
	.post(async (req, res, next) => {
		const userName = req.body.username
		const password = req.body.password
		if (UserService.matchLogin(userName, password)) {
			jwt.sign({ userName }, secret, (err, token) => {
				res.json({ token })
			})
		} else {
			res.status(404).json({
				success: 0,
				data: {
					message: 'Incorrect credentials. Try again.'
				}
			})
		}
	})

router.use(verifyToken)
router.route('/user')
	.get(async (req, res, next) => {
		jwt.verify(req.token, secret, async (err, authData) => {
			if (err) {
				res.status(403).json({ message: 'Unknown token'})
			} else {
				const user = await UserService.getUserInfo(authData.userName)
				res.json({ user })
			}
		})
	})

router.route('/logout')
	.get(async (req, res, next) => {
		res.json({
			success: 1
		})
	})


function verifyToken(req, res, next) {
	const bearerHeader = req.headers['authorization']
	if(typeof bearerHeader !== undefined) {
		const bearer = bearerHeader.split(' ')
		const token = bearer[1]
		req.token = token
		next()
	} else {
		res.status(403).json({message: 'Unknown token'})
	}
}

module.exports = router;
