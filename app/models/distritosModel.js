module.exports = function(){

  //Pegar todos os distritos
  this.getDistritos = function(connection, callback){
    connection.query('select DISTRITOS.DESCRICAO as DESCRICAO, CIDADES.DESCRICAO as CIDADE from DISTRITOS inner join CIDADES on (DISTRITOS.CIDADE_ID =  CIDADES.ID  ) ;', callback);
  };

  //Pegar Distritos por ID
  this.getDistritoById = function(id, connection, callback){
    connection.query(`select * from DISTRITOS where ID = ${id};`, callback);
  };

  //Pegar Distrito por ID
  this.getDistritoByDescription = function(descricao, connection, callback){
    connection.query(`select ID from DISTRITOS where DESCRICAO = "${descricao}";`, callback);
  };

  //Inserir Distrito com ID do estado
  this.postDistritoIdCidade = function(distrito , connection, callback){
      connection.query(`insert into DISTRITOS ( DESCRICAO, ESTADO_ID ) VALUES ?;`, [distrito] , callback);
  };

  //Inserir Distrito com Descricao do estado
  this.postDistritoDescCidade = function(distrito , connection, callback){
      var cidade = distrito[1];
      var distrito = distrito[0];
      connection.query(`insert into DISTRITOS (DESCRICAO, CIDADE_ID) SELECT "${distrito}" as DESCRICAO, ID as CIDADE_ID from CIDADES where DESCRICAO = "${cidade}";`, callback);
  };

  return this;
}
