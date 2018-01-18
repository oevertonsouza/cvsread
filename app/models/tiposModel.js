module.exports = function(){

  this.getTipos = function(connection, callback){
    connection.query('select * from TIPOS;', callback);
  };

  this.getTipo = function(id, connection, callback){
    connection.query(`select * from TIPOS where ID = ${id};`, callback);
  };

  this.postTipo = function(descricao , connection, callback){
    connection.query(`insert into TIPOS ( DESCRICAO ) VALUES ( "${descricao}" );`, callback);
  };

  return this;
}
