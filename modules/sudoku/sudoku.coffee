fetchSudoku = ->
	name = 'Wesley'
	date = '5/1/16'

	$.ajax
		url: "/generateSudoku"
		type: "GET"
		dataType: "json"
		data: { name, date }
		success: (err, res, body) ->
			console.log 'success'
		error: (err, res, body) ->
			console.log 'error'

fetchSudoku()