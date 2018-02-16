module.exports = function(){

  //insere acesso
  this.postAcesso = function(acesso, connection, callback){
    connection.query('insert into ACESSO SET ?;' , acesso ,callback);
  };

  //retorna acesso
  this.getAcessoByUuidAndUserId = function(uuid, userid, connection, callback){
    var query = `select * from ACESSO where USUARIO_ID = ${userid} and UUID = "${uuid}";`
    connection.query(query ,callback);
  };

  return this;
}
