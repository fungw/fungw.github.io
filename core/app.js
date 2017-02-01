var PORT, app, express, parking, path, sudoku;

express = require('express');

path = require('path');

sudoku = require('./sudoku.js');

parking = require('./parking.js');

app = express();

PORT = 8080;

app.use(express["static"]('public'));

app.get('/favicon.ico', function(req, res) {
  res.sendStatus(200);
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../modules/main/main.html'));
});

app.listen(PORT, function() {
  console.log('Server listening on port %s', PORT);
});

app.get('/mobile', function(req, res) {
  res.sendFile(path.join(__dirname + '/../modules/main/mobile.html'));
});

app.get('/sudoku', function(req, res) {
  res.sendFile(path.join(__dirname + '/../modules/sudoku/sudoku.html'));
});

app.get('/generateSudoku', function(req, res) {
  console.log(sudoku.generateSudoku());
});

app.get('/parking', function(req, res) {
  res.sendFile(path.join(__dirname + '/../modules/parking/parking.html'));
});

app.get('/fetchParkingInfo', function(req, res) {
  parking.fetchParkingInfo(function(data) {
    return res.send(data);
  });
});
