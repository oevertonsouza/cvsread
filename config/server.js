var consign = require('consign');
var express = require('express');
var bodyParser = require('body-parser');

var app =  express();

app.use(bodyParser());

consign()
  .include('./app/routes')
  .then('config/dbConnection.js')
  .then('./app/models')
  .into(app);

module.exports = app;
