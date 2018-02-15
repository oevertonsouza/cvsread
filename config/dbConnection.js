var mysql = require('mysql');

var connMySql = function(){
  return mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database : ''
  });
};

module.exports = function(){
  return connMySql;
};
