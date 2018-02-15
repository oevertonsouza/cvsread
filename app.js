var app = require('./config/server');
var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
/*
app.listen(4200, function(){
  console.log("Rodando com Express!");
});
*/
