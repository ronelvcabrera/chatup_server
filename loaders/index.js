const expressLoader = require('./express')
const mongooseLoader = require('./mongoose')
const socketioLoader = require('./socketio')

module.exports = async (context) => {
	await expressLoader(context)
	console.log('Express initialized')
	await mongooseLoader(context)
	console.log('Mongoose initialized')
	await socketioLoader(context)
	console.log('Socketio initialized')
}