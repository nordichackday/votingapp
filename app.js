var express = require('express');
var favicon = require('serve-favicon');
var fs = require('fs');
var _ = require('underscore');
var io = require('socket.IO');

var model = require('./backend/model');

var app = express();
app.use(favicon(__dirname + '/public/images/favicon.ico'));

/* Callbacks */

function newVote() {
	io.sockets.volatile.emit('tweet', {
	  user: data.user.screen_name,
	  text: data.text
	});
}

/* Routes */
app.post('/api/vote', function(req, res){
	console.log("Got vote");
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

app.use(express.static(__dirname + '/public'));

/* Go go go */

var port = process.env.port || 8081;
app.listen(port);

var io = require('socket.IO').listen(app);

console.log("Listening on port " + port);

exports = module.exports = app;
