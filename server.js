var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var Grant = require('grant-express');
var grant = new Grant(require('./config.json'));
var logger = require('morgan');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	user_id: String,
	screen_name: String,
	token: String

})

var User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://'+
									process.env.USER+':'+
									process.env.MONGO_PW+
									'@ds019033.mlab.com:19033/nodeauth')

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('db open');
})
app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, 'js')));

app.use(session({secret: 'grant'}));
app.use(grant);
app.use(logger('dev'));

app.get('/handle_twitter_callback', function (req, res) {
  var userId = req.query.raw.user_id;
  var user = new User({ 
  	user_id: req.query.raw.user_id,
  	screen_name: req.query.raw.screen_name,
  	token: req.query.access_token,
	});

	//If the user is not in db save their info
	User.findOne({user_id: userId}, function(err, user1) {
		if (err) return console.error(err);
		console.log(user1);
		if (!user1) {
		  user.save(function (err, user) {
		  	if (err) return console.error(err);
		  });
		}
	});
  // res.end(JSON.stringify(req.query, null, 2))
});

app.get('*', function(req, res) {
  console.log(req.connection.remoteAddress);
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(8080, function() {
	console.log("Server on port 8080");
});