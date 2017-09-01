// Get dependencies
require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./server/routes');
const app = express();

// connect to mongoose here
const dbUrl = process.env.db_url_dev || process.env.db_url_prod;
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, { useMongoClient: true });

// enable cors
app.use(cors());

// Log requests to the console.
app.use(logger('dev'));

// Categorize CRUD request corectly
app.use(methodOverride('_method'));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add custom routes here
routes.apply(app);

// Point static path to dist
app.use('/', express.static(path.join(__dirname, 'client/dist'), {
    redirect: false
}));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    console.log('here');
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8001';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

// For testing purposes
module.exports = app;
