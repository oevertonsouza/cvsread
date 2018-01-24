module.exports = function(){

  //Pegar todos os Depadms
  this.getDepadms = function(connection, callback){
    connection.query('select * from DEPADMS;', callback);
  };

  //Pegar Depadms por ID
  this.getgetDepadmById = function(id, connection, callback){
    connection.query(`select * from DEPADMS where ID = ${id};`, callback);
  };

  //Pegar Depadm por Descriçao
  this.getgetDepadmByDescription = function(descricao, connection, callback){
    connection.query(`select ID from DEPADMS where DESCRICAO = "${descricao}";`, callback);
  };

  //Inserir Depadm
  this.postDepadmOnlyDesc = function(descricao, connection, callback){
      connection.query(`insert into DEPADMS (DESCRICAO) VALUES ("${descricao}");`, callback);
  };

  return this;
}
