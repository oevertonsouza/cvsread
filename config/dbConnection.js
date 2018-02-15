var mysql = require('mysql');

var connMySql = function(){
  return mysql.createConnection({
    host: 'p2d0untihotgr5f6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'k70d3etlksurt4rt',
    password : 'ja7q3p0s1uvj464u',
    //password : '',
    database : 'c0nuzcl01ayjt73k'
    /*
    host: '127.0.0.1',
    user: 'root',
    password : 'Pms@2017',
    //password : '',
    database : 'redb'
    */
  });
};

module.exports = function(){
  return connMySql;
};
