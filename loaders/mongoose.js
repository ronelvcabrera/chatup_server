const User = require('../models/User')

module.exports = ({ mongoose, config }) => {
	mongoose.connect(
		config.mongoDb,
		{
			useUnifiedTopology: true,
			useNewUrlParser: true
		},
		async () => {
			console.log('Connected to DB')
			const users = await User.find({ username: config.defaultUser }).exec()
			if (!users.length) {
				let defaultUser = new User({
					username: config.defaultUser,
					password: config.defaultPassword
				})
				await defaultUser.save()
				console.log('Created default user');
			}
		}
	)
}