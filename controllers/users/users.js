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

//GET - Return a TVShow with specified ID
exports.findUserById = function(req, res) {
	User.findById(req.params.id, function(err, user) {
    if(err) return res.send(500, err.message);

    console.log('GET /user/' + req.params.id);
		res.status(200).jsonp(user);
	});
};

//POST - Insert a new TVShow in the DB
exports.addUser = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var tvshow = new User({
		title:    req.body.title,
		year: 	  req.body.year,
		country:  req.body.country,
		poster:   req.body.poster,
		seasons:  req.body.seasons,
		genre:    req.body.genre,
		summary:  req.body.summary
	});

	tvshow.save(function(err, tvshow) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(tvshow);
	});
};

//PUT - Update a register already exists
exports.updateUser = function(req, res) {
	User.findById(req.params.id, function(err, user) {
		tvshow.title   = req.body.petId;
		tvshow.year    = req.body.year;
		tvshow.country = req.body.country;
		tvshow.poster  = req.body.poster;
		tvshow.seasons = req.body.seasons;
		tvshow.genre   = req.body.genre;
		tvshow.summary = req.body.summary;

		tvshow.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(tvshow);
		});
	});
};

//DELETE - Delete a TVShow with specified ID
exports.deleteUser = function(req, res) {
	User.findById(req.params.id, function(err, user) {
		user.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200);
		})
	});
};
