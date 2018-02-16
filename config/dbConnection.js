var mysql = require('mysql');

var connMySql = function(){
  return mysql.createConnection({
    host: "mysql427.umbler.com",
    user: "moleria",
    password: "moleiraindie",
    database : "redb"
    /*
      host: "127.0.0.1",
      user: "root",
      password: "",
      database : "redb"
    */
  });
};

module.exports = function(){
  return connMySql;
};
