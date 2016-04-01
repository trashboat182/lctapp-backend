var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/locoto', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var LoginUserModel     = require('./models/users/users')(app, mongoose);
var LocotoUserCtrl = require('./controllers/users/users');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});
app.use(router);

// API routes
/** USERS */
var locotoApi = express.Router();

locotoApi.route('/users')
  .get(LocotoUserCtrl.findAllUsers)
  .post(LocotoUserCtrl.addUser);

locotoApi.route('/users/:name')
  .get(LocotoUserCtrl.findUserByName)
  .put(LocotoUserCtrl.updateUser)
  .delete(LocotoUserCtrl.deleteUser);

app.use('/api', locotoApi);

// Start server
app.listen(9000, function() {
  console.log("Node server running on http://localhost:9000");
});
