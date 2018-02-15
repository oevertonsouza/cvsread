var mysql = require('mysql');

var connMySql = function(){
  return mysql.createConnection({
    host: 'p2d0untihotgr5f6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'k70d3etlksurt4rt',
    password : 'ja7q3p0s1uvj464u',
    database : 'c0nuzcl01ayjt73k'
  });
};

module.exports = function(){
  return connMySql;
};
