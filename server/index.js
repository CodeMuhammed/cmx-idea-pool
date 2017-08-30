require('dotenv').config();

const http = require('http');
const express = require('express');
const app = require('./app');

const expressApp = express();
app.init(expressApp);

const port = parseInt(process.env.PORT, 10) || 8001;
expressApp.set('port', port);

const server = http.createServer(expressApp);
server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});