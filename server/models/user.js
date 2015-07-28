import { Schema, default as mongoose } from 'mongoose';

module.exports = function (app) {
	var schema = new Schema({
		role: String,
		created: {
			type: Date,
			default: Date.now
		},
		name: String,
		email: String,

		accounts: [
			new Schema({
				identifier: String,
				provider: String
			})
		],
		totp: {
			enabled: Boolean,
			key: String,
			period: String
		},
		local: {
			username: {
				type: String,
				index: { unique: true }
			},
			password: String
		}
	});

	app.require('./user.parts/auth', schema);
	app.require('./user.parts/local', schema);

	app.models.User = mongoose.model('User', schema);
};
