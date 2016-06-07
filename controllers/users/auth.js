var mongoose = require('mongoose');
var User  = mongoose.model('User');
var nodemailer = require('nodemailer');
var root, pswd;

//PUT - Update a register already exists
exports.authUser = function(req, res) {
    console.log("PUT");
    console.log(req.params);
    User.findOne({username:"root"}, function(err, user){
        root = user.email; pswd = user.password;
    });

    if(req.params.name){
        User.findOne({username:req.params.name}, function(err, user) {
            console.log("root: "+root);
            if(root && pswd){
                /*
                var transporter = nodemailer.createTransport('SMTP',{
                    service: 'Gmail',
                    auth: {
                        user: root,
                        pass: pswd
                    }
                });*/
                var transporter = nodemailer.createTransport('smtps://'+root+'%40gmail.com:'+pswd+'@smtp.gmail.com');
                // setup e-mail data with unicode symbols
                var mailOptions = {
                    from: '"Host" <'+root+'@gmail.com>',
                    to: user.email,
                    subject: 'Activate your account',
                    text: 'Hello world',
                    html: '<h3><b>Hi There</b></h3><p>You have registeres a new account. Please activate your account by using the link below:</p><a href="http://www.google.com">Register here!</a>' +
                        '<p>You have one day to register your account.</p><p>Thanks!</p><p><b>PatoMalo</b></p>'
                };
                // send mail with defined transport object
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log(error);
                        return res.send(500, error);
                    }
                    console.log('Message sent: ' + info.response);
                });
            }
            else {
                console.log("There is not root user");
                return res.send(500, "There is not ROOT user");
            }
            user.save(function(err) {
                if(err) return res.send(500, err.message);
                res.status(200).jsonp(user);
            });
        });
    }
};