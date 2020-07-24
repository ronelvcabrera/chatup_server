/**
 * Message 
 * 		type: broadcast, message, welcome?
 * 		color: 
 * 			danger - Warnings and left chat
 * 			info - own message
 * 			secondary - others message
 * 			primary - highlight
 */

module.exports = async ({ config, server, io }) => {
    server.listen(config.port, () => {
        console.log(`Socket server is running on port ${config.port}`)
    })
    io.on('connection', socket => {
		socket.emit('NEW_MESSAGE', {
			date: new Date(),
			user: null,
			type: 'welcome',
			color: 'primary',
			message: 'Welcome! Enjoy and Chat UP!'
		})
		socket.on('SEND_MESSAGE', (message) => {
			socket.broadcast.emit('NEW_MESSAGE', message)
		})

		socket.on('disconnect', () => {
			io.emit('LEAVE_CHAT_UP', {
				date: new Date(),
				user: null,
				type: 'broadcast',
				color: 'danger',
				message: 'A user has left Chat up'
			})
		})
    })
}