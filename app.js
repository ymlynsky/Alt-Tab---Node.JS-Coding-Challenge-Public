'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');

const authentication = require('./server/middleware/authentication');
const routes = require('./server/routes');

const app = express();

mongoose.connect(config.get('db.connection'));

app.use(bodyParser.json());
app.use(authentication);
app.use('/', routes);

app.listen(5000, () => {
    console.log('listening on port 5000');
})

module.exports = app;
