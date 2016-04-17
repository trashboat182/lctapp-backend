//File: controllers/tvshows.js
var mongoose = require('mongoose');
var User  = mongoose.model('User');

//PUT - Update a register already exists
exports.addImage = function(req, res) {
	if(req.params.name){
		User.findOne({username:req.params.name}, function(err, user) {
			user.files[0].data.push(req.body);
			user.files.set(0,req.body);
			
			user.save(function(err) {
				if(err) return res.send(500, err.message);
	      		res.status(200).jsonp(user);
	      		console.log('saved');
			});
		});
	}
};
