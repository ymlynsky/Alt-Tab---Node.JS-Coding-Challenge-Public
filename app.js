const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const BPromise = require('bluebird');

const config = require('./server/config');
const users = require('./server/routes/users');

mongoose.connect(config.database.local);
mongoose.Promise = BPromise;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', users);

// Init passport
app.use(passport.initialize());
require('./server/config/passport')(passport);

// Static routes
app.use(express.static('app_client'));
app.use(express.static('public'));

require('./server/middleware/error-middleware.js')(app);

app.listen(3000, () => {
	console.log('Example app listening on port 3000!')
});


