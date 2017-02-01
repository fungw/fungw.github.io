$(function() {
  var loadChart, lot_names, lot_spaces, total_spaces;
  lot_names = [];
  lot_spaces = [];
  total_spaces = [500, 1000, 264, 500, 567, 340, 145, 370, 252, 1127, 465, 380];
  $.ajax({
    url: "/fetchParkingInfo",
    type: "GET",
    success: function(err, res, body) {
      var data, key;
      data = JSON.parse(body.responseText);
      for (key in data[0]) {
        if (data[0].hasOwnProperty(key)) {
          if (key !== 'time') {
            lot_names.push(key);
          }
          if (key !== 'time') {
            lot_spaces.push(data[0][key]);
          }
        }
      }
      return loadChart();
    },
    error: function(err, res, body) {}
  });
  return loadChart = function() {
    var occupied;
    occupied = _.difference(total_spaces, lot_spaces);
    occupied = occupied.map(Number);
    lot_spaces = lot_spaces.map(Number);
    return Highcharts.chart('container', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Dublin Parking Information'
      },
      subtitle: {
        text: 'Source: <a href="http://www.dublincity.ie/dublintraffic/carparks.htm">Dublin City Traffic</a>'
      },
      xAxis: {
        categories: lot_names
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Parking Spaces'
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
      },
      plotOptions: {
        series: {
          stacking: 'percent'
        }
      },
      series: [
        {
          name: 'Occupied',
          data: occupied
        }, {
          name: 'Available',
          data: lot_spaces
        }
      ]
    });
  };
});
