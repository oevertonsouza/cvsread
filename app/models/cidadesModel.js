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

  //Inserir Cidade
  this.postCidade = function(cidade , connection, callback){
      connection.query(`insert into CIDADES ( DESCRICAO, ESTADO_ID ) VALUES ?;`, [cidade] , callback);
  };

  return this;
}
