var mysql = require('mysql');

var connMySql = function(){
  return mysql.createConnection({
    host: "mysql427.umbler.com",
    user: "moleria",
    password: "moleiraindie",
    database : "redb"
  });
};

module.exports = function(){
  return connMySql;
};
