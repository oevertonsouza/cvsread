var mysql = require('mysql');

var connMySql = function(){
  return mysql.createConnection({
    host: '',
    user: '',
    password : '',
    //password : '',
    database : ''
    /*
    host: '127.0.0.1',
    user: 'root',
    password : '',
    //password : '',
    database : 'redb'
    */
  });
};

module.exports = function(){
  return connMySql;
};
