//File: controllers/tvshows.js
var mongoose = require('mongoose');
var User  = mongoose.model('User');

//PUT - Update a register already exists
exports.addImage = function(req, res) {
	console.log('add Image');
	if(req.params.name){
		User.findOne({username:req.params.name}, function(err, user) {
			var index = user.files[0].data.length;
			user.files[0].data.push(req.body);
			user.markModified('files');
			
			user.save(function(err) {
				if(err) return res.send(500, err.message);
	      		res.status(200).jsonp(user);
			});
		});
	}
}
exports.addMusic = function(req, res) {
	console.log('add Music');
	if(req.params.name){
		User.findOne({username:req.params.name}, function(err, user) {
			var index = user.files[0].data.length;
			user.files[1].data.push(req.body);
			user.markModified('files');
			
			user.save(function(err) {
				if(err) return res.send(500, err.message);
	      		res.status(200).jsonp(user);
			});
		});
	}
}
exports.addVideo = function(req, res) {
	console.log('add Video');
	if(req.params.name){
		User.findOne({username:req.params.name}, function(err, user) {
			var index = user.files[0].data.length;
			user.files[2].data.push(req.body);
			user.markModified('files');
			
			user.save(function(err) {
				if(err) return res.send(500, err.message);
	      		res.status(200).jsonp(user);
			});
		});
	}
}
