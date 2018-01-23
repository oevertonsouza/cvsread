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
      var estado = bairro[3];
      var cidade = bairro[2];
      var distrito = bairro[1];
      var bairro = bairro[0];
      var query = `insert into BAIRROS (
                      DESCRICAO,
                      DISTRITO_ID
                    )
                    select
                      "${bairro}" as DESCRICAO,
                       D.ID as DISTRITO_ID
                    from DISTRITOS D
                      inner join CIDADES C on (D.CIDADE_ID = C.ID)
                      inner join ESTADOS E on (C.ESTADO_ID = E.ID)
                    where 1=1
                      and E.DESCRICAO = "${estado}"
                      and C.DESCRICAO = "${cidade}"
                      and D.DESCRICAO = "${distrito}"
                    ;`
      //console.log(query);
      connection.query(query, callback);
  };

  return this;
}
