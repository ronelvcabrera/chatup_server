const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	apiPort: process.env.API_PORT,
	socketPort: process.env.SOCKET_PORT,
	mongoDb: process.env.MONGO_DB,
	secret: process.env.APP_SECRET,
	defaultUser: process.env.DEFAULT_USER,
	defaultPassword: process.env.DEFAULT_USER_PASSWORD,
}