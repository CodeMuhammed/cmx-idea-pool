const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

// database url read from the environment variables
const dbUrl = process.env.db_url_dev || process.env.db_url_prod;

module.exports = {
    init: (app) => {
        // connect to mongoose here
        mongoose.Promise = global.Promise;
        mongoose.connect(dbUrl, { useMongoClient: true })
        .then(() => {
            // enable cors
            app.use(cors());

            // Log requests to the console.
            app.use(logger('dev'));

            // Categorize CRUD request corectly
            app.use(methodOverride('_method'));

            // Parse incoming request's data.
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));

            // Add routes here
            routes.apply(app);
        })
        .catch(err => console.error(err));
    }
};