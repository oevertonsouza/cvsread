module.exports = function(){

  //Pegar todos os Subprefeituras
  this.getSubprefeituras = function(connection, callback){
    connection.query('select * from SUBPREFEITURAS;', callback);
  };

  //Pegar Subprefeituras por ID
  this.getSubprefeituraById = function(id, connection, callback){
    connection.query(`select * from SUBPREFEITURAS where ID = ${id};`, callback);
  };

  //Pegar Subprefeitura por ID
  this.getSubprefeituraByDescription = function(descricao, connection, callback){
    connection.query(`select ID from SUBPREFEITURAS where DESCRICAO = "${descricao}";`, callback);
  };

  //Inserir Subprefeitura só com Descricao
  this.postSubprefeituraOnlyDesc = function(descricao, connection, callback){
      connection.query(`insert into SUBPREFEITURAS (DESCRICAO) VALUES ("${descricao}");`, callback);
  };

  return this;
}
