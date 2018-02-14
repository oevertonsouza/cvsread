var mysql = require('mysql');

var connMySql = function(){
  return mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password : 'Pms@2017',
    //password : '',
    database : 'redb'
  });
};

module.exports = function(){
  return connMySql;
};
