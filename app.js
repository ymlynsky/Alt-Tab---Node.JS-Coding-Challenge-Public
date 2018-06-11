'use strict';

let express = require('express');
let bodyParser = require('body-parser');

let routes = require('./server/routes');

let app = express();

mongoose.connect('mongodb+srv://upstack:upstacktest@tracc-master-vt8et.mongodb.net/upstack?retryWrites=true');

app.use(bodyParser.json());
app.use('/', routes);


app.listen(5000, () => {
    console.log('listening on port 5000');
})

module.exports = app;
