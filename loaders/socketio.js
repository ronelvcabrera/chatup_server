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
    server.listen(config.socketPort, () => {
        console.log(`Socket server is running on port ${config.socketPort}`)
    })
    io.on('connection', socket => {
		socket.on('JOIN_CHAT', (newMember) => {
			socket.currentMember = newMember
			if (!io.members) {
				io.members = [ newMember ]
			} else {
				io.members.push(newMember)
			}
			socket.emit('CHAT_INFO', {
				members: io.members
			})
			socket.broadcast.emit('NEW_MEMBER', newMember)
			socket.broadcast.emit('NEW_MESSAGE', {
				date: new Date(),
				user: newMember.username,
				type: 'broadcast',
				color: 'info',
				message: `${newMember.username} has joined`
			})
		})

		socket.on('SEND_MESSAGE', (message) => {
			socket.broadcast.emit('NEW_MESSAGE', message)
		})

		socket.on('disconnect', () => {
			if (socket.currentMember) {
				socket.broadcast.emit('NEW_MESSAGE', {
					date: new Date(),
					user: socket.currentMember.username,
					type: 'broadcast',
					color: 'danger',
					message: `${socket.currentMember.username} has left Chat Up`
				})
				io.members = io.members.filter((member) => member.username != socket.currentMember.username)
			}
			socket.broadcast.emit('CHAT_INFO', {
				members: io.members
			})
		})
    })
}