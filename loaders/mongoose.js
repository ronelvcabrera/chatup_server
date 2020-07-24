module.exports = ({ mongoose, config }) => {
	mongoose.connect(
		config.mongoDb,
		{
			useUnifiedTopology: true,
			useNewUrlParser: true
		},
		async () => {
			console.log('Connected to DB')
		}
	)
}