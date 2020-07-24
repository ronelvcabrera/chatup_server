const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const socketio = require('socket.io')

const loaders = require('./loaders')
const config = require('./config')
// const fileRoutes = require('./api/file')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = config.port ? config.port:8081

async function startServer() {
	await loaders({ app, express, mongoose, config, server, io })
	// app.use('/api/file', fileRoutes)
	// app.get('/', (req, res, next) => { res.send('welcome')})
}
startServer();