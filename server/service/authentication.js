const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken')

const hash = function(password) {
    return bcrypt.hash(password, 10);
}

const compare = function(password, hash) {
    return bcrypt.compare(password, hash);
}

const generateJwt = function (user) {
    let privateKey = config.get('auth.jwtPrivateKey');
    return jwt.sign({ _id: user._id, email: user.email, name: user.name }, privateKey);
}

module.exports = {
    hash,
    compare,
    generateJwt
}