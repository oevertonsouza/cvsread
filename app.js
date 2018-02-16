var app = require('./config/server');

var port = process.env.PORT_DEFAULT;
//var port = 4200;

app.listen(port, function() {
    console.log('listening on port %s', port);
});
