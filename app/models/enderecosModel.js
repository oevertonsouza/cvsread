module.exports = function(){

  //Pegar todos os Endereços
  this.getEnderecos = function(connection, callback){
    connection.query('select * from ENDERECOS;', callback);
  };

  //Pegar Endereços por ID
  this.getEnderecoById = function(id, connection, callback){
    connection.query(`select * from ENDERECOS where ID = ${id};`, callback);
  };

  //Pegar Endereço por ID
  this.getEnderecoByDescription = function(descricao, connection, callback){
    connection.query(`select ID from ENDERECOS where DESCRICAO = "${descricao}";`, callback);
  };

  //Inserir Endereço
  this.postEnderecoByDescriptions = function(escola , connection, callback){

      var endereco = escola[0];
      var numero = escola[1];
      var cep = escola[2];
      var bairro = escola[3];
      var distrito = escola[4];
      var cidade = escola[5];
      var estado = escola[6];
      var latitude = parseFloat(escola[7].toString().substring(3, 0) +'.'+ escola[7].toString().substring(4, escola[7].toString().length));
      var longitude = parseFloat(escola[8].toString().substring(3, 0) +'.'+ escola[7].toString().substring(4, escola[8].toString().length));

      var query = `insert into ENDERECOS (
                      ENDERECO,
                      NUMERO,
                      CEP,
                      BAIRRO_ID,
                      DISTRITO_ID,
                      CIDADE_ID,
                      ESTADO_ID,
                      LATITUDE,
                      LONGITUDE
                   )
                   select
                      "${endereco}" as ENDERECO,
                      "${numero}" as NUMERO,
                      "${cep}" as CEP,
                      B.ID as BAIRRO_ID,
                      D.ID as DISTRITO_ID,
                      C.ID as CIDADE_ID,
                      E.ID as ESTADO_ID,
                      ${latitude} as LATITUDE,
                      ${longitude} as LONGITUDE
                   from BAIRROS B
                      inner join DISTRITOS D on (B.DISTRITO_ID = D.ID)
                      inner join CIDADES C on (D.CIDADE_ID = C.ID)
                      inner join ESTADOS E on (C.ESTADO_ID = E.ID)
                   where 1=1
                      and B.DESCRICAO = "${bairro}"
                      and D.DESCRICAO = "${distrito}"
                      and C.DESCRICAO = "${cidade}"
                      and E.DESCRICAO = "${estado}"`
      connection.query(query, callback);
  };

  return this;
}
