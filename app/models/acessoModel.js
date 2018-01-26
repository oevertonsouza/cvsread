module.exports = function(){

  this.postAcesso = function(acesso, connection, callback){
    connection.query('insert into ACESSO SET ?;' , acesso ,callback);
  };

  return this;
}
