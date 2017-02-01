var fetchSudoku;

fetchSudoku = function() {
  var date, name;
  name = 'Wesley';
  date = '5/1/16';
  return $.ajax({
    url: "/generateSudoku",
    type: "GET",
    dataType: "json",
    data: {
      name: name,
      date: date
    },
    success: function(err, res, body) {
      return console.log('success');
    },
    error: function(err, res, body) {
      return console.log('error');
    }
  });
};

fetchSudoku();
