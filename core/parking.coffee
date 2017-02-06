sqlite3 = require('sqlite3').verbose()
db = new sqlite3.Database('./lot.db')
fs = require('fs')

fetchParkingInfo = (cb) ->
  data = []
  db.each "SELECT * FROM PARKINGLOT ORDER BY time DESC limit 1;", ((err, rows) ->
    data.push rows
  ), ->
    db.close
    cb data

requestParkLotInfo = (req, cb) ->
  fs.readFile './data/lot_data.json', (err, data) ->
    if err 
      throw err
    lot_parsed = JSON.parse data
    req_lot_name = req.parking_lot_name
    req_user_location = req.user_location_TEST

    route = {
      src: req_user_location
      dst_lat: lot_parsed[req_lot_name].lat
      dst_lng: lot_parsed[req_lot_name].lng
      dst: lot_parsed[req_lot_name].coordinates
    }
    cb route 

module.exports = { fetchParkingInfo, requestParkLotInfo }