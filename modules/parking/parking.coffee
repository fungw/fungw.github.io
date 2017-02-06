map = undefined
directionsService = undefined
lat = 53.347347
lng = -6.259189
markers = []

initGoogleService = ->
  directionsService = new google.maps.DirectionsService()
  mapOptions =  
    center: new (google.maps.LatLng)(lat, lng)
    zoom: 13
  map = new (google.maps.Map)(document.getElementById('map'), mapOptions)

mapResize = () ->
  google.maps.event.trigger map, 'resize'
  map.setCenter(new google.maps.LatLng(lat, lng))

addMarker = (lat, lng) ->
  marker = new (google.maps.Marker)(
    position: new google.maps.LatLng(lat, lng)
    title: 'Home Center')
  markers.push marker
  showMarkers()

setMapOnAll = (clear) ->
  i = 0
  while i < markers.length
    markers[i].setMap map
    i++

clearMarkers = () ->
  setMapOnAll(null)

showMarkers = () ->
  setMapOnAll map

deleteMarkers = () ->
  clearMarkers()
  markers = []


$ ->
  lot_names = []
  lot_spaces = []
  total_spaces = [500, 1000, 264, 500, 567, 340, 220, 212, 145, 370, 252, 1127, 465, 380]
  na_spaces = []
  time = ""

  $.ajax
    url: "/fetchParkingInfo"
    type: "GET"
    success: (err, res, body) ->
      data = JSON.parse body.responseText
      i = 0
      for key of data[0]
        lot_names.push(key) unless key == 'time'
        if data[0][key].length == 1
          na_spaces.push(total_spaces[i]) unless key == 'time'
          lot_spaces.push(0) unless key == 'time'
          total_spaces[i] = 0
        else
          if data[0][key] == 'FULL'
            lot_spaces.push(0)
          else
            lot_spaces.push(data[0][key]) unless key == 'time'
          na_spaces.push(0) unless key == 'time'
        i++
        if key == 'time'
          time = data[0][key]
      loadChart()
    error: (err, res, body) ->

  loadChart = () ->
    i = 0
    occupied = []
    while i < total_spaces.length
      difference = total_spaces[i] - lot_spaces[i]
      occupied[i] = if difference < 0 then 0 else difference
      i++
    lot_spaces = lot_spaces.map(Number)
    Highcharts.chart 'container',
      chart: type: 'bar'
      title: text: 'Dublin Parking Information'
      subtitle: text: 'Source: <a target="_blank" href="http://www.dublincity.ie/dublintraffic/carparks.htm">Dublin City Traffic</a> | Last Updated: ' + time
      xAxis: categories: lot_names
      yAxis:
        min: 0
        title: text: 'Parking Spaces %'
      tooltip:
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>'
        shared: true
      plotOptions: 
        series: 
          stacking: 'percent', 
          events: 
            click: () ->
              $("#mapModal").modal()
              requestParkLotInfo(event.point.category) unless !navigator.geolocation
      series: [
        {
          name: 'Occupied'
          data: occupied
        }
        {
          name: 'Available'
          data: lot_spaces
        }
        {
          name: 'No Data'
          data: na_spaces
        }
      ]
    
  requestGoogleDir = (src, dst) ->
    request = {
      origin: src,
      destination: dst,
      travelMode: 'DRIVING'
    }
    directionsService.route(request, (result, status) ->
      if status == 'OK'
        console.log result.routes[0].legs[0].duration.text
    )

  requestParkLotInfo = (parking_lot_name) ->
    user_location_TEST = "53.3408119, -6.2461844"
    $.ajax
      url: "/requestParkLotInfo"
      type: "GET"
      data: { user_location_TEST, parking_lot_name }
      success: (err, res, body) ->
        data = JSON.parse body.responseText
        requestGoogleDir data.src, data.dst
        deleteMarkers()
        addMarker data.dst_lat, data.dst_lng
      error: (err, res, body) ->

  $('#mapModal').on 'shown.bs.modal', (e) ->
    mapResize()

  $(document).ready ->
    initGoogleService()