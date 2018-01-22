module.exports = function(){

  //Pegar todos os Bairros
  this.getDiretorias = function(connection, callback){
    connection.query('select * from DIRETORIAS;', callback);
  };

  //Pegar Cidades por ID
  this.getDiretoriaById = function(id, connection, callback){
    connection.query(`select * from DIRETORIAS where ID = ${id};`, callback);
  };

  //Pegar Bairro por ID
  this.getDiretoriaByDescription = function(descricao, connection, callback){
    connection.query(`select ID from DIRETORIAS where DESCRICAO = "${descricao}";`, callback);
  };

  //Inserir Diretoria só com Descricao
  this.postDiretoriaOnlyDesc = function(descricao , connection, callback){
      connection.query(`insert into DIRETORIAS (DESCRICAO) VALUES ("${descricao}");`, callback);
  };

  return this;
}
