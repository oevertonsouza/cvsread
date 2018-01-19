module.exports = function(){

  //Pegar todos os tipos
  this.getTipos = function(connection, callback){
    connection.query('select * from TIPOS;', callback);
  };

  //Pegar tipo por ID
  this.getTipoById = function(id, connection, callback){
    connection.query(`select * from TIPOS where ID = ${id};`, callback);
  };

  //Pegar tipo por ID
  this.getTipoByDescription = function(descricao, connection, callback){
    var query = `select ID from TIPOS where DESCRICAO = "${descricao}";`;
    connection.query(query, callback);
  };

  //Inserit tipo
  this.postTipo = function(descricao , connection, callback){
    connection.query(`insert into TIPOS ( DESCRICAO ) VALUES ( "${descricao}" );`, callback);
  };

  return this;
}
