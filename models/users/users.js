exports = module.exports = function(app, mongoose) {

	var userSchema = new mongoose.Schema({
		username: 		{ type: String, index: { unique: true }},
		password: 		{ type: String },
		email: 	{ type: String, index: { unique: true }},
		userAuth: { type: Boolean},
		emailAuth: { type: Boolean},
		company:  	{ type: String },
		companyDescription: 	{ type: String },
		managerName: { type: String },
		category: { type: String },
		office: { type: String },
		address: { type: String },
		telephone: { type: String },
		fax: { type: String },
		webpage: { type: String },
		facebookAccount: { type: String },
		otherAccount: { type: String },
	});

	mongoose.model('User', userSchema);

};
