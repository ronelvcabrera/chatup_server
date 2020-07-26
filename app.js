const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const socketio = require('socket.io')

const loaders = require('./loaders')
const config = require('./config')
const registerRoutes = require('./api/user/register')
const authRoutes = require('./api/auth')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = config.port ? config.port:8081

async function startServer() {
	await loaders({ app, express, mongoose, config, server, io })
	app.use('/api/user/register', registerRoutes)
	app.use('/api/auth', authRoutes)
	app.listen(config.apiPort, err => {
		if (err) {
			return
		}
		console.log(`App is running on ${config.apiPort}`)
	})
}
startServer();