express = require('express')
path = require('path')
app = express()
PORT = 8080
app.use express.static('public')

app.get '/favicon.ico', (req, res) ->
  res.send 200
  return

app.get '/', (req, res) ->
  res.sendFile path.join(__dirname + '/public/main/main.html')
  return

app.listen PORT, ->
  console.log 'Server listening on port %s', PORT
  return

app.get '/mobile', (req, res) ->
  res.sendFile path.join(__dirname + '/public/main/mobile.html')
  return

# Sudoku routing
app.get '/sudoku', (req, res) ->
  res.sendFile path.join(__dirname + '/public/sudoku/sudokuMain.html')
  return

app.get '/generateSudoku', (req, res, next) ->
  x = new Array(9)
  i = 0
  while i < 9
    x[i] = new Array(9)
    i++
  res.send x
  next()
  return