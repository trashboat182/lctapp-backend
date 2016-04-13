var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');
    multer = require('multer');

// Connection to DB
mongoose.connect('mongodb://localhost/locoto', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

  var storage = multer.diskStorage({ //multers disk storage settings
      destination: function (req, file, cb) {
          cb(null, './uploads/')
      },
      filename: function (req, file, cb) {
          var datetimestamp = Date.now();
          cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
      }
  });

  var upload = multer({ //multer settings
      storage: storage
  }).single('file');



// Import Models and controllers
var LoginUserModel     = require('./models/users/users')(app, mongoose);
var LocotoUserCtrl = require('./controllers/users/users');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  console.log(__dirname);
  res.send("Hello world! "+__dirname);
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

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // * => allow all origins
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Accept'); // add remove headers according to your needs
  next()
})
app.use('/api', locotoApi); 

 /** API path that will upload the files */
  app.post('/upload', function(req, res) {
    console.log('post file');
      upload(req,res,function(err){
          if(err){
               res.json({error_code:1,err_desc:err});
               return;
          }
           res.json({error_code:0,err_desc:null});
      })
     
  });

// Start server
app.listen(9000, function() {
  console.log("Node server running on http://localhost:9000");
});
