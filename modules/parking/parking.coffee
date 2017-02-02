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
          lot_spaces.push(data[0][key]) unless key == 'time'
          na_spaces.push(0) unless key == 'time'
        i++
        if key == 'time'
          time = data[0][key]
          console.log time
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
      plotOptions: series: stacking: 'percent'
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