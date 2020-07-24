const bodyParser = require('body-parser')
const path = require('path')

module.exports = async ({ app, express }) => {
	app.use(bodyParser.json())
    // Set static folder
	app.use(express.static(path.join(__dirname, '../public')))
	// app.get('/chat', (req, res) => {
	// 	return res.sendFile(path.join(__dirname, '../public/chat.html'))
	// })
	return app
}