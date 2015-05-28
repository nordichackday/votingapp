var express = require('express');
var favicon = require('serve-favicon');
var fs = require('fs');
var _ = require('underscore');
var io = require('socket.IO');

var model = require('./backend/model');

var app = express();
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(__dirname + '/public'));

/* Go go go */

var port = process.env.port || 8081;
var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

exports = module.exports = app;

/* Callbacks */
function newVote(val) {
	io.sockets.emit('vote', {
	  user: "oyvind",
	  text: "hallo"
	});
}

/* Routes */
app.post('/api/vote', function(req, res){
	newVote();
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