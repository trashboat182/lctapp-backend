exports = module.exports = function(app, mongoose) {

	var userSchema = new mongoose.Schema({
		user: 		{ type: String },
		password: 		{ type: String },
		email: 	{ type: String },
		emailAuth: { type: Boolean}
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

	mongoose.model('User', tvshowSchema);

};
