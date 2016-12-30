var express = require('express');
var path = require('path');
var app = express();

var PORT = 8080;

app.use(express.static('public'));

app.get('/favicon.ico', function(req, res) {
	res.send(200);
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/main.html'));
});

app.listen(PORT, function() {
	console.log('Server listening on port %s', PORT)
});
