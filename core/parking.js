var db, fetchParkingInfo, fs, requestParkLotInfo, sqlite3;

sqlite3 = require('sqlite3').verbose();

db = new sqlite3.Database('./lot.db');

fs = require('fs');

fetchParkingInfo = function(cb) {
  var data;
  data = [];
  return db.each("SELECT * FROM PARKINGLOT ORDER BY time DESC limit 1;", (function(err, rows) {
    return data.push(rows);
  }), function() {
    db.close;
    return cb(data);
  });
};

requestParkLotInfo = function(req, cb) {
  return fs.readFile('./data/lot_data.json', function(err, data) {
    var lot_parsed, req_lot_name, req_user_location, route;
    if (err) {
      throw err;
    }
    lot_parsed = JSON.parse(data);
    req_lot_name = req.parking_lot_name;
    req_user_location = req.user_location_TEST;
    route = {
      src: req_user_location,
      dst: lot_parsed[req_lot_name].coordinates
    };
    return cb(route);
  });
};

module.exports = {
  fetchParkingInfo: fetchParkingInfo,
  requestParkLotInfo: requestParkLotInfo
};
