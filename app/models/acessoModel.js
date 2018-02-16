module.exports = function(){

  //insere acesso
  this.postAcesso = function(acesso, connection, callback){
    connection.query('insert into ACESSO SET ?;' , acesso ,callback);
  };

  //retorna acesso
  this.getAcessoByUuidAndUserId = function(uuid, userId, connection, callback){
    var query = `select * from ACESSO where USUARIO_ID = ${userId} and UUID = "${uuid}";`
    connection.query(query ,callback);
  };

  return this;
}
