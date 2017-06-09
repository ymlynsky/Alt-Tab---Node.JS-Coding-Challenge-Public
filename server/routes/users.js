const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');
const validator = require('validator');
const errors = require('../lib/errors');

// Register new users
router.post('/register', (req, res, next) => {
	if (!req.body.email || !req.body.password) {
		return next(errors.updateResourceError('Please enter email and password.'));
	}
	
	let newUser = new User({
		email: req.body.email,
		password: req.body.password,
		name: req.body.name || ''
	});

	// Attempt to save the user
	newUser.save()
	.then((user) => res.json({token: getJwt(user)}))
	.catch(err => next(errors.loginError()));
});

router.post('/login', (req, res, next) => {
	if (!validator.isEmail(req.body.email) || !req.body.password) {
		return next(errors.loginError('Use email & password for login.'));
	}

	User.findOne({ email: req.body.email })
	.then(user => {
		if (!user) {
			next(errors.loginError('User not found.'));
		} else {
			// Check if password matches
			return user.comparePassword(req.body.password)
			.then(isMatch => {
				if (isMatch) {
					// Create token if the password matched and no error was thrown					
					res.json({token: getJwt(user)});
				} else {
					next(errors.userPasswordError());
				}
			});
		}
	})
	.catch(err => next(err));
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({ name: req.user.name, email: req.user.email });	
});

router.delete('/user', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	const isUserAdmin = true;

	if (req.body.id !== String(req.user._id) && isUserAdmin) {
		return next(errors.unauthorized('Invalid credentials for this operation.'))
	}
	User.remove({ _id: req.body.id })
	.then(user => {
		res.json({ message: 'User successfully removed.'});
	})
	.catch(err => next(err));
});

function getJwt(user) {
	let payload = {
		email: user.email,
		name: user.name,
		id: user.id
	};
	let token = jwt.sign(payload, config.auth.secret, {
		expiresIn: "2 days"
	});
	return token;
}

module.exports = router;