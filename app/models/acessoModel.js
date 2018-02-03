module.exports = function(){

  //insere acesso
  this.postAcesso = function(acesso, connection, callback){
    connection.query('insert into ACESSO SET ?;' , acesso ,callback);
  };

  //retorna acesso
  this.getAcessoById = function(id, connection, callback){
    var query = `select UUID from ACESSO A where ID = ${id}`
    connection.query(query , acesso ,callback);
  };

  return this;
}
