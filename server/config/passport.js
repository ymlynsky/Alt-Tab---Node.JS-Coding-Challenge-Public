const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const config = require('../config/');

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
	let opts = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
		secretOrKey: config.auth.secret
	};

	let findUser = (jwt_payload, done) => {
		User.findOne({ _id: jwt_payload.id })
		.then(user => {
			if(user) {
				return done(null, user);
			}
			done(null, false);
		})
		.catch(err => done(err, false));
	};

	passport.use(new JwtStrategy(opts, findUser));
};