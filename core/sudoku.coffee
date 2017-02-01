_ = require 'underscore'
TRACKER = [1, 2, 3, 4, 5, 6, 7, 8, 9]

generateSudoku = () ->
	sudokuGrid = blankCanvas()
	sudokuFill sudokuGrid
	sudokuGrid

blankCanvas = () ->
	x = new Array(9)
	i = 0
	while i < 9
		x[i] = new Array(9)
		i++
	x

sudokuFill = (grid) ->
	sudokuValue = _.random 0, 9
	row = _.random 0, 8
	col = _.random 0, 8
	grid[row][col] = sudokuValue
	valid = backtrack grid, row, col

backtrack = (grid, row, col) ->
	return checkSector(grid, row, col) & checkRow(grid, row) & checkCol(grid, col)

checkSector = (grid, row, col) ->
	console.log row, row / 3
	console.log col, col / 3
	true

checkRow = (grid, row) ->
	i = 0; j = 0
	while i < 9
		value = TRACKER[i]
		while j < 9
			if grid[row][j] is value then return false
			else j++
		i++
	true

checkCol = (grid, col) ->
	i = 0; j = 0
	while j < 9
		value = TRACKER[j]
		while i < 9
			if grid[i][col] is value then return false
			else i++
		j++
	true

module.exports = { generateSudoku }