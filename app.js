var app = require('./config/server');

var port = process.env.PORT || 3000;


app.listen(port, function() {
    console.log('Umbler listening on port %s', port);
});

/*
app.listen(4200, function(){
  console.log("Rodando com Express!");
});
*/
