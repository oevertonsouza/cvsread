module.exports = function(){

  //Pegar todos os distritos
  this.getDistritos = function(connection, callback){
    connection.query('select DISTRITOS.ID as ID, DISTRITOS.DESCRICAO as DESCRICAO, CIDADES.ID as CIDADADE_ID, CIDADES.DESCRICAO as CIDADE from DISTRITOS inner join CIDADES on (DISTRITOS.CIDADE_ID =  CIDADES.ID  ) ;', callback);
  };

  //Pegar Distritos por ID
  this.getDistritoById = function(id, connection, callback){
    var query = `
      select
        D.ID,
        D.DESCRICAO as DISTRITO,
        D.CIDADE_ID,
        C.DESCRICAO as CIDADE,
        C.ESTADO_ID,
        E.DESCRICAO as ESTADO
      from DISTRITOS D
        inner join CIDADES C on (D.CIDADE_ID = C.ID)
        inner join ESTADOS E on (C.ESTADO_ID = E.ID)
      where D.ID = ${id};
    `;
    console.log(query);
    connection.query(query, callback);
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
