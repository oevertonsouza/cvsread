module.exports = function(){

  //Pegar todos os Estados
  this.getEstados = function(connection, callback){
    connection.query('select * from ESTADOS;', callback);
  };

  //Pegar Estados por ID
  this.getEstadoById = function(id, connection, callback){
    connection.query(`select * from ESTADOS where ID = ${id};`, callback);
  };

  //Pegar Estado por ID
  this.getEstadoByDescription = function(descricao, connection, callback){
    connection.query(`select ID from ESTADOS where DESCRICAO = "${descricao}";`, callback);
  };

  //Inserit Estado
  this.postEstado = function(descricao , connection, callback){
    connection.query(`insert into ESTADOS ( DESCRICAO ) VALUES ?;`, [descricao] , callback);
  };

  return this;
}
