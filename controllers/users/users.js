//File: controllers/tvshows.js
var mongoose = require('mongoose');
var User  = mongoose.model('User');

//GET - Return all tvshows in the DB
exports.findAllUsers = function(req, res) {
	User.find(function(err, users) {
    if(err) res.send(500, err.message);

    console.log('GET /users')
		res.status(200).jsonp(users);
	});
};

//GET - Return a User with specified Name
exports.findUserByName = function(req, res) {
	console.log('req.params.name');
	console.log(req.params.name);
	User.findOne({ "username" : req.params.name }, function(err, user) {
		console.log('user');
		console.log(user);
    if(err) return res.send(500, err.message);

    console.log('GET /user/' + req.params.name);
		res.status(200).jsonp(user);
	});
};

//POST - Insert a new User in the DB
exports.addUser = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var user = new User({
		username : req.body.username,
		password : req.body.password,
		email : req.body.email,
		userAuth: req.body.userAuth,
		emailAuth : false,
		company : '',
		companyDescription : '',
		managerName : '',
		category: '',
		office: '',
		address: '',
		telephone: '',
		fax: '',
		emailSecundary: '',
		webpage: '',
		facebookAccount: '',
		otherAccount: '',		
	});
		user.files.push({
	         type: 'images',
	         data: []
	      });
		user.files.push({
	         type: 'music',
	         data: []
	      });
	    user.files.push({
	         type: 'videos',
	         data: []
	      })

	user.save(function(err, user) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(user);
	});
};

//PUT - Update a register already exists
exports.updateUser = function(req, res) {
	if(req.params.name){
		User.findOne({username:req.params.name}, function(err, user) {
			user.username   = req.body.username ? req.body.username:user.username;
			user.password    = req.body.password ? req.body.password: user.password;
			user.email = req.body.email ? req.body.email: user.email;
			user.emailAuth  = req.body.emailAuth ? req.body.emailAuth: user.emailAuth;
			user.company = req.body.company ? req.body.company : user.company;
			user.companyDescription   = req.body.companyDescription ? req.body.companyDescription: user.companyDescription;
			user.managerName = req.body.managerName ? req.body.managerName: user.managerName;
			user.category = req.body.category ? req.body.category: user.category;
			user.office = req.body.office ? req.body.office: user.office;
			user.address = req.body.address ? req.body.address: user.address;
			user.telephone = req.body.telephone ? req.body.telephone: user.telephone;
			user.fax = req.body.fax  ? req.body.fax : user.fax ;
			user.emailSecundary = req.body.emailSecundary  ? req.body.emailSecundary : user.emailSecundary ;
			user.webpage = req.body.webpage ? req.body.webpage: user.webpage;
			user.facebookAccount = req.body.facebookAccount ? req.body.facebookAccount: user.facebookAccount;
			user.otherAccount = req.body.otherAccount ? req.body.otherAccount: user.otherAccount;

			user.save(function(err) {
				if(err) return res.send(500, err.message);
	      		res.status(200).jsonp(user);
			});
		});
	}
};

//DELETE - Delete a User with specified ID
exports.deleteUser = function(req, res) {
	User.findOne(req.params.name, function(err, user) {
		user.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200);
		})
	});
};
