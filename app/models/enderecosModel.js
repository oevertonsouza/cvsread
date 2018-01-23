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
  this.postEnderecoByDescriptions = function(endereco , connection, callback){

      var longitude = parseFloat(endereco[9]);
      var latitude = parseFloat(endereco[8]);
      var estado = endereco[7];
      var cidade = endereco[6];
      var distrito = endereco[5];
      var bairro = endereco[4];
      var cep = endereco[3];
      var complemento = endereco[2];
      var numero = endereco[1];
      var endereco = endereco[0];

      var query = `insert into ENDERECOS (
                      ENDERECO,
                      NUMERO,
                      COMPLEMENTO,
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
                      "${complemento}" as COMPLEMENTO,
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

      console.log(query);
      //connection.query(query, callback);

  };

  return this;
}
