'use strict'

express = require('express')
path = require('path')
parking = require('./parking.js')

app = express()
PORT = 8082
app.use express.static('public')

#app.get '/favicon.ico', (req, res) ->
#  res.sendStatus path.join(__dirname + '/../modules/main/favicon.ico')

# Main view routing
app.get '/', (req, res) ->
  res.sendFile path.join(__dirname + '/../modules/main/main.html')

app.listen PORT, ->
  console.log 'Server listening on port %s', PORT

app.get '/mobile', (req, res) ->
  res.sendFile path.join(__dirname + '/../modules/main/mobile.html')

# Dublin Parking Lot routing
app.get '/parking', (req, res) ->
  res.sendFile path.join(__dirname + '/../modules/parking/parking.html')

app.get '/fetchParkingInfo', (req, res) ->
  parking.fetchParkingInfo (data) ->
    res.send data
  
app.get '/requestParkLotInfo?', (req, res) ->
  parking.requestParkLotInfo req.query, (cb) ->
    res.send cb
