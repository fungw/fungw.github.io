sqlite3 = require('sqlite3').verbose()
db = new sqlite3.Database('./lot.db')

fetchParkingInfo = (cb) ->
  data = []
  db.each "SELECT * FROM PARKINGLOT ORDER BY time DESC limit 1;", ((err, rows) ->
    data.push rows
  ), ->
    db.close
    cb data

module.exports = { fetchParkingInfo }