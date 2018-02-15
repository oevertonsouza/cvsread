var mysql = require('mysql');

var connMySql = function(){
  return mysql.createConnection({
    
  });
};

module.exports = function(){
  return connMySql;
};
