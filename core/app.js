'use strict';
var PORT, app, express, parking, path;

express = require('express');

path = require('path');

parking = require('./parking.js');

app = express();

PORT = 8082;

app.use(express["static"]('public'));

app.get('/', function(req, res) {
  return res.sendFile(path.join(__dirname + '/../modules/main/main.html'));
});

app.listen(PORT, function() {
  return console.log('Server listening on port %s', PORT);
});

app.get('/mobile', function(req, res) {
  return res.sendFile(path.join(__dirname + '/../modules/main/mobile.html'));
});

app.get('/parking', function(req, res) {
  return res.sendFile(path.join(__dirname + '/../modules/parking/parking.html'));
});

app.get('/fetchParkingInfo', function(req, res) {
  return parking.fetchParkingInfo(function(data) {
    return res.send(data);
  });
});

app.get('/requestParkLotInfo?', function(req, res) {
  return parking.requestParkLotInfo(req.query, function(cb) {
    return res.send(cb);
  });
});
