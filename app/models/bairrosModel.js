module.exports = function(){

  //Pegar todos os Bairros
  this.getBairros = function(connection, callback){
    connection.query('select * from BAIRROS;', callback);
  };

  //Pegar Cidades por ID
  this.getBairroById = function(id, connection, callback){
    connection.query(`select * from BAIRROS where ID = ${id};`, callback);
  };

  //Pegar Bairro por ID
  this.getBairroByDescription = function(descricao, connection, callback){
    connection.query(`select ID from BAIRROS where DESCRICAO = "${descricao}";`, callback);
  };

  //Inserir Bairro com ID do estado
  this.postBairroIdDistrito = function(bairro , connection, callback){
      connection.query(`insert into BAIRROS ( DESCRICAO, ESTADO_ID ) VALUES ?;`, [bairro] , callback);
  };

  //Inserir Bairro com Descricao do estado
  this.postBairroDescDistrito = function(bairro , connection, callback){
      var distrito = bairro[1];
      var bairro = bairro[0];
      connection.query(`insert into BAIRROS (DESCRICAO, DISTRITO_ID) SELECT "${bairro}" as DESCRICAO, ID as DISTRITO_ID from DISTRITOS where DESCRICAO = "${distrito}";`, callback);
  };

  return this;
}
