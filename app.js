var app = require('./config/server');

app.listen(process.env.PORT || 5000, function(){
  console.log("Rodando com Express!");
});
