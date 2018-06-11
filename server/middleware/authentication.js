const config = require('config');
const jwt = require('express-jwt');

const secret = {
    secret: config.get('auth.jwtPrivateKey')
}

const path = [
    '/api/register', 
    '/api/login'
];

module.exports = jwt(secret).unless({ path })