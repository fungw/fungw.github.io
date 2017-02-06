var addMarker, clearMarkers, deleteMarkers, directionsService, initGoogleService, lat, lng, map, mapResize, markers, setMapOnAll, showMarkers;

map = void 0;

directionsService = void 0;

lat = 53.347347;

lng = -6.259189;

markers = [];

initGoogleService = function() {
  var mapOptions;
  directionsService = new google.maps.DirectionsService();
  mapOptions = {
    center: new google.maps.LatLng(lat, lng),
    zoom: 13
  };
  return map = new google.maps.Map(document.getElementById('map'), mapOptions);
};

mapResize = function() {
  google.maps.event.trigger(map, 'resize');
  return map.setCenter(new google.maps.LatLng(lat, lng));
};

addMarker = function(lat, lng) {
  var marker;
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    title: 'Home Center'
  });
  markers.push(marker);
  return showMarkers();
};

setMapOnAll = function(clear) {
  var i, results;
  i = 0;
  results = [];
  while (i < markers.length) {
    markers[i].setMap(map);
    results.push(i++);
  }
  return results;
};

clearMarkers = function() {
  return setMapOnAll(null);
};

showMarkers = function() {
  return setMapOnAll(map);
};

deleteMarkers = function() {
  clearMarkers();
  return markers = [];
};

$(function() {
  var loadChart, lot_names, lot_spaces, na_spaces, requestGoogleDir, requestParkLotInfo, time, total_spaces;
  lot_names = [];
  lot_spaces = [];
  total_spaces = [500, 1000, 264, 500, 567, 340, 220, 212, 145, 370, 252, 1127, 465, 380];
  na_spaces = [];
  time = "";
  $.ajax({
    url: "/fetchParkingInfo",
    type: "GET",
    success: function(err, res, body) {
      var data, i, key;
      data = JSON.parse(body.responseText);
      i = 0;
      for (key in data[0]) {
        if (key !== 'time') {
          lot_names.push(key);
        }
        if (data[0][key].length === 1) {
          if (key !== 'time') {
            na_spaces.push(total_spaces[i]);
          }
          if (key !== 'time') {
            lot_spaces.push(0);
          }
          total_spaces[i] = 0;
        } else {
          if (data[0][key] === 'FULL') {
            lot_spaces.push(0);
          } else {
            if (key !== 'time') {
              lot_spaces.push(data[0][key]);
            }
          }
          if (key !== 'time') {
            na_spaces.push(0);
          }
        }
        i++;
        if (key === 'time') {
          time = data[0][key];
        }
      }
      return loadChart();
    },
    error: function(err, res, body) {}
  });
  loadChart = function() {
    var difference, i, occupied;
    i = 0;
    occupied = [];
    while (i < total_spaces.length) {
      difference = total_spaces[i] - lot_spaces[i];
      occupied[i] = difference < 0 ? 0 : difference;
      i++;
    }
    lot_spaces = lot_spaces.map(Number);
    return Highcharts.chart('container', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Dublin Parking Information'
      },
      subtitle: {
        text: 'Source: <a target="_blank" href="http://www.dublincity.ie/dublintraffic/carparks.htm">Dublin City Traffic</a> | Last Updated: ' + time
      },
      xAxis: {
        categories: lot_names
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Parking Spaces %'
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
      },
      plotOptions: {
        series: {
          stacking: 'percent',
          events: {
            click: function() {
              $("#mapModal").modal();
              if (!!navigator.geolocation) {
                return requestParkLotInfo(event.point.category);
              }
            }
          }
        }
      },
      series: [
        {
          name: 'Occupied',
          data: occupied
        }, {
          name: 'Available',
          data: lot_spaces
        }, {
          name: 'No Data',
          data: na_spaces
        }
      ]
    });
  };
  requestGoogleDir = function(src, dst) {
    var request;
    request = {
      origin: src,
      destination: dst,
      travelMode: 'DRIVING'
    };
    return directionsService.route(request, function(result, status) {
      if (status === 'OK') {
        return console.log(result.routes[0].legs[0].duration.text);
      }
    });
  };
  requestParkLotInfo = function(parking_lot_name) {
    var user_location_TEST;
    user_location_TEST = "53.3408119, -6.2461844";
    return $.ajax({
      url: "/requestParkLotInfo",
      type: "GET",
      data: {
        user_location_TEST: user_location_TEST,
        parking_lot_name: parking_lot_name
      },
      success: function(err, res, body) {
        var data;
        data = JSON.parse(body.responseText);
        requestGoogleDir(data.src, data.dst);
        deleteMarkers();
        return addMarker(data.dst_lat, data.dst_lng);
      },
      error: function(err, res, body) {}
    });
  };
  $('#mapModal').on('shown.bs.modal', function(e) {
    return mapResize();
  });
  return $(document).ready(function() {
    return initGoogleService();
  });
});
