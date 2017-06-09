const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	}
});

// make things before save to DB
UserSchema.pre('save', function(next) {
	let user = this;
	if (this.isModified('password') || this.isNew) {
		// make password hash 
		bcrypt.genSalt(10)
		.then(salt =>
			bcrypt.hash(user.password, salt)
			.then(hash => {
				user.password = hash;
				next();
			})
		)
		.catch(err => next(err));
	} else {
		return next();
	}
});

UserSchema.methods.comparePassword = function(pw) {
	return bcrypt.compare(pw, this.password);
};

module.exports = mongoose.model('User', UserSchema);