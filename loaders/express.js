const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = async ({ app, express, config }) => {
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParser.json())
	app.use(cors())
    // Set static folder
	// app.use(express.static(path.join(__dirname, '../public')))
	return app
}