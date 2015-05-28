var express = require('express');
var favicon = require('serve-favicon');
var fs = require('fs');
var _ = require('underscore');
var io = require('socket.IO');
var bodyParser = require('body-parser')

var model = require('./backend/model');


var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

	
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  return next();
});

/* Go go go */
var port = process.env.port || 8081;
var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

exports = module.exports = app;

/* Callbacks */
function newVote(voteMsg) {
	io.sockets.emit('vote', voteMsg);
}

io.on('connection', function(socket){
	console.log('a user connected');
  	socket.on('sendVote', function(msg){
    	newVote(msg);
  	});
});

/* Routes */
/* Routes */
app.post('/api/vote', function(req, res){
	console.log(req.body);

	var msg = {
		type: "vote",
		name: req.body.name,
		unicodeValue: req.body.unicodeValue		
	};

	newVote(msg);

	res.send("OK!");
});

app.get('', function(req, res) {
	fs.readFile("./public/views/index.html", function(err, data) {
		res.set('Content-Type', 'text/html');
		res.send(data);
	})	
});

app.get('/results', function(req, res) {
	fs.readFile("./public/views/results.html", function(err, data) {
		res.set('Content-Type', 'text/html');
		res.send(data);
	})	
});