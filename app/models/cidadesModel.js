module.exports = function(){

  //Pegar todos os Cidades
  this.getCidades = function(connection, callback){
    connection.query('select * from CIDADES;', callback);
  };

  //Pegar Cidades por ID
  this.getCidadeById = function(id, connection, callback){
    connection.query(`select * from CIDADES where ID = ${id};`, callback);
  };

  //Pegar Cidade por ID
  this.getCidadeByDescription = function(descricao, connection, callback){
    connection.query(`select ID from CIDADES where DESCRICAO = "${descricao}";`, callback);
  };

  //Inserir Cidade com ID do estado
  this.postCidadeIdEstado = function(cidade , connection, callback){
      connection.query(`insert into CIDADES ( DESCRICAO, ESTADO_ID ) VALUES ?;`, [cidade] , callback);
  };

  //Inserir Cidade com Descricao do estado
  this.postCidadeDescEstado = function(cidade , connection, callback){
      var estado = cidade[1];
      var cidade = cidade[0];
      connection.query(`insert into CIDADES (DESCRICAO, ESTADO_ID) SELECT "${cidade}" as DESCRICAO, ID as ESTADO_ID from ESTADOS where DESCRICAO = "${estado}";`, callback);
  };

  return this;
}
