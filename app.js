var express = require('express');
var favicon = require('serve-favicon');
var fs = require('fs');
var _ = require('underscore');
var io = require('socket.IO');
var bodyParser = require('body-parser')

var aggregate = require('./backend/aggregate');

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

var connected = 0;

/* Callbacks */
function newVote(voteMsg) {
	io.sockets.emit('vote', voteMsg);
}

io.on('connection', function(socket){
	connected = connected +1;
	console.log(connected);
  	socket.on('sendVote', function(msg){
    	newVote(msg);
  	});

  	socket.on('disconnect', function(){
  		connected = connected-1;
  	});
});

setInterval(function() {
	io.sockets.emit('aggregate', aggregate.get());
	io.sockets.emit('users', connected);
}, 2000);

/* Routes */
app.post('/api/vote', function(req, res) {
	aggregate.countVote(req.body.name);
	var msg = {
		type: "vote",
		name: req.body.name,
		unicodeValue: req.body.unicodeValue
	};

	newVote(msg);
	res.send("OK!");
});

app.get('/api/vote/aggregate', function (req, res) {
	var aggregatedVotes = aggregate.get();
	res.json(aggregatedVotes);
});

app.get('/api/vote/aggregate/reset', function(req, res) {
	aggregate.reset();
	res.send("OK");
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

app.get('/eurovision', function(req, res) {
	fs.readFile("./public/views/eurovisionresults.html", function(err, data) {
		res.set('Content-Type', 'text/html');
		res.send(data);
	})	
});

app.get('/footballvote', function(req, res) {
	fs.readFile("./public/views/footballvote.html", function(err, data) {
		res.set('Content-Type', 'text/html');
		res.send(data);
	})	
});

app.get('/football', function(req, res) {
	fs.readFile("./public/views/football.html", function(err, data) {
		res.set('Content-Type', 'text/html');
		res.send(data);
	})	
});