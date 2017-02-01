var db, fetchParkingInfo, sqlite3;

sqlite3 = require('sqlite3').verbose();

db = new sqlite3.Database('./lot.db');

fetchParkingInfo = function(cb) {
  var data;
  data = [];
  return db.each("SELECT * FROM PARKINGLOT;", (function(err, rows) {
    return data.push(rows);
  }), function() {
    db.close;
    return cb(data);
  });
};

module.exports = {
  fetchParkingInfo: fetchParkingInfo
};
