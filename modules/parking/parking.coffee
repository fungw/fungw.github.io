map = undefined
directionsService = undefined
directionsDisplay = undefined
lat = 53.347347
lng = -6.259189
zoom = 14
markers = []
user_location = undefined
default_user_location = "53.343556, -6.250611"

initGoogleService = ->
  directionsService = new google.maps.DirectionsService()
  directionsDisplay = new google.maps.DirectionsRenderer();
  mapOptions =  
    center: new (google.maps.LatLng)(lat, lng)
    zoom: zoom
  map = new (google.maps.Map)(document.getElementById('map'), mapOptions)
  directionsDisplay.setMap map

mapResize = () ->
  google.maps.event.trigger map, 'resize'
  map.setCenter(new google.maps.LatLng(lat, lng))

addMarker = (lat, lng) ->
  marker = new (google.maps.Marker)(
    position: new google.maps.LatLng(lat, lng)
    title: 'Parking Lot'
    icon:
      path: google.maps.SymbolPath.CIRCLE
      scale: 5
  )
  markers.push marker

addUserLocation = (lat, lng) ->
  marker = new (google.maps.Marker)(
    position: new google.maps.LatLng(lat, lng)
    title: 'User'
    icon:
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW
      scale: 2
  )
  markers.push marker

setMapOnAll = (map) ->
  i = 0
  while i < markers.length
    markers[i].setMap map
    i++

clearMarkers = () ->
  setMapOnAll null

showMarkers = () ->
  setMapOnAll map

deleteMarkers = () ->
  clearMarkers()
  markers = []
  return

getLocation = () ->
  if navigator.geolocation
    navigator.geolocation.getCurrentPosition showPosition
  else
    alert "Geolocation is not supported by this browser."

showPosition = (position) ->
  user_lat = position.coords.latitude
  user_lng = position.coords.longitude
  user_location = user_lat + ", " + user_lng
  addUserLocation user_lat, user_lng
  showMarkers()

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
        $("#travel_time").text("Travel Time: " + result.routes[0].legs[0].duration.text)
        directionsDisplay.setDirections result
        map.fitBounds result.routes[0].bounds
        listener = google.maps.event.addListener(map, 'idle', ->
          if map.getZoom() > zoom
            map.setZoom zoom
          google.maps.event.removeListener listener
          return
        )
    )

  requestParkLotInfo = (parking_lot_name) ->
    getLocation()
    user_location_str = if user_location is undefined then default_user_location else user_location
    $.ajax
      url: "/requestParkLotInfo"
      type: "GET"
      data: { user_location_str, parking_lot_name }
      success: (err, res, body) ->
        data = JSON.parse body.responseText
        requestGoogleDir data.src, data.dst
        deleteMarkers()
        addMarker data.dst_lat, data.dst_lng
        showMarkers()
      error: (err, res, body) ->

  $('#mapModal').on 'shown.bs.modal', (e) ->
    mapResize()

  $(document).ready ->
    initGoogleService()