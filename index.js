require('dotenv').config();

const Server = require('./models/server');

const servidorCorriendo = new Server();

servidorCorriendo.listen();
