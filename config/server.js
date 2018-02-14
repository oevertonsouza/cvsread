var consign = require('consign');
var express = require('express');
var bodyParser = require('body-parser');

var app =  express();

app.use(bodyParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

consign()
  .include('./app/routes')
  .then('config/dbConnection.js')
  .then('./app/models')
  .into(app);

module.exports = app;
