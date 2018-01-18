var consign = require('consign');
var express = require('express');

var app =  express();
consign()
  .include('./app/routes')
  .then('config/dbConnection.js')
  .then('./app/models')
  .into(app);
module.exports = app;
