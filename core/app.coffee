express = require('express')
path = require('path')
sudoku = require('./sudoku.js')
app = express()
PORT = 8080
app.use express.static('public')

app.get '/favicon.ico', (req, res) ->
  res.sendStatus 200
  return

# Main view routing
app.get '/', (req, res) ->
  res.sendFile path.join(__dirname + '/../modules/main/main.html')
  return

app.listen PORT, ->
  console.log 'Server listening on port %s', PORT
  return

app.get '/mobile', (req, res) ->
  res.sendFile path.join(__dirname + '/../modules/main/mobile.html')
  return

# Sudoku routing
app.get '/sudoku', (req, res) ->
  res.sendFile path.join(__dirname + '/../modules/sudoku/sudoku.html')
  return

app.get '/generateSudoku', (req, res) ->
  console.log sudoku.generateSudoku()
  return