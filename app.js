var app = require('./config/server');
app.listen(process.env.PORT || 5000);
/*
app.listen(4200, function(){
  console.log("Rodando com Express!");
});
*/
