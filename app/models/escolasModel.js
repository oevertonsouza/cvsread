module.exports = function(){

  //Pegar todos os Escolas
  this.getEscolas = function(connection, callback){
    connection.query(`select
                        ES.ID,
                        ES.NOME,
                        ES.DDD,
                        ES.TELEFONE1,
                        ES.TELEFONE2,
                        ES.EMAIL,
                        E.ENDERECO,
                        E.NUMERO,
                        E.COMPLEMENTO,
                        E.CEP,
                        B.DESCRICAO as BAIRRO,
                        D.DESCRICAO as DISTRITO
                      from ESCOLAS ES
                        inner join ENDERECOS E on (ES.ENDERECO_ID = E.ID)
                        inner join BAIRROS B on (E.BAIRRO_ID = B.ID)
                        inner join DISTRITOS D on (E.DISTRITO_ID = D.ID)
                      ;`, callback);
  };

  //Pegar Escolas por ID
  this.getEscolaById = function(id, connection, callback){
    connection.query(`select
                        ES.ID,
                        ES.NOME,
                        ES.DDD,
                        ES.TELEFONE1,
                        ES.TELEFONE2,
                        ES.EMAIL,
                        E.ENDERECO,
                        E.NUMERO,
                        E.CEP,
                        E.COMPLEMENTO,
                        B.DESCRICAO as BAIRRO,
                        D.DESCRICAO as DISTRITO,
                        C.DESCRICAO  as CIDADE,
                        EST.DESCRICAO  as ESTADO
                      from ESCOLAS ES
                        inner join ENDERECOS E on (ES.ENDERECO_ID = E.ID)
                        inner join BAIRROS B on (E.BAIRRO_ID = B.ID)
                        inner join DISTRITOS D on (B.DISTRITO_ID = D.ID)
                        inner join CIDADES C on (D.CIDADE_ID = C.ID)
                        inner join ESTADOS EST on (C.ESTADO_ID = EST.ID)
                      where ES.ID = ${id};`, callback);
  };

  //Pegar Escola por ID
  this.getEscolaByDescription = function(descricao, connection, callback){
    connection.query(`select ID from ESCOLAS where DESCRICAO = "${descricao}";`, callback);
  };

  //Inserir Escola
  this.postEscolaByDescriptions = function(escola , connection, callback){

      var nome = escola[0];
      var email = escola[1];
      var ddd = escola[2];
      var telefone1 = escola[3];
      var telefone2 = escola[4];
      var tipo = escola[5];
      var diretoria = escola[6];
      var depadm = escola[7];
      var endereco = escola[8];
      var bairro = escola[9];
      var distrito = escola[10];
      var cidade = escola[11];
      var estado = escola[12];
      var cep = escola[13];

      var query = `insert into ESCOLAS (
                      NOME,
                      EMAIL,
                      DDD,
                      TELEFONE1,
                      TELEFONE2,
                      TIPO_ID,
                      DIRETORIA_ID,
                      DEPADM_ID,
                      ENDERECO_ID
                   )
                   select
                      "${nome}" as NOME,
                      "${email}" as EMAIL,
                      "${ddd}" as DDD,
                      "${telefone1}" as TELEFONE1,
                      "${telefone2}" as TELEFONE2,
                      (select ID from TIPOS where DESCRICAO = "${tipo}") as TIPO_ID,
                      (select ID from DIRETORIAS where DESCRICAO = "${diretoria}") as DIRETORIA_ID,
                      (select ID from DEPADMS where DESCRICAO = "${depadm}") as DEPADM_ID,
                      (select
                          E.ID
                        from
                          ENDERECOS E
                        inner join BAIRROS B on (E.BAIRRO_ID = B.ID)
                        inner join DISTRITOS D on (B.DISTRITO_ID = D.ID)
                        inner join CIDADES C on (D.CIDADE_ID = C.ID)
                        inner join ESTADOS ES on (C.ESTADO_ID = ES.ID)
                        where 1=1
                          and E.ENDERECO = "${endereco}"
                          and E.CEP = "${cep}"
                          and B.DESCRICAO = "${bairro}"
                          and D.DESCRICAO = "${distrito}"
                          and C.DESCRICAO = "${cidade}"
                          and ES.DESCRICAO = "${estado}"
                        ) as ENDERECO_ID
                      `
      //console.log(query);
      connection.query(query, callback);
  };

  return this;
}
